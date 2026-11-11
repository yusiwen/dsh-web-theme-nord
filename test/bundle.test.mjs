import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const root = new URL('..', import.meta.url);
const pkg = JSON.parse(fs.readFileSync(new URL('package.json', root), 'utf8'));
const clientSource = fs.readFileSync(new URL('lib/client.js', root), 'utf8');

/** Execute the browser bundle and return the module it registers. */
function loadBundle() {
  let registered;
  const sandbox = {
    Symbol,
    window: { __ModuleLoader__: { load: (module) => { registered = module; } } },
  };
  vm.createContext(sandbox);
  vm.runInContext(clientSource, sandbox, { filename: 'lib/client.js' });
  assert.ok(registered, 'bundle must call __ModuleLoader__.load');
  return registered;
}

/** Materialize the registered factory with no external module requests. */
function loadClientExport() {
  return loadBundle().factory((id) => {
    throw new Error(`unexpected require: ${id}`);
  });
}

test('bundle id matches the package name', () => {
  assert.equal(loadBundle().id, pkg.name);
});

test('client exports apply/inject/name', () => {
  const client = loadClientExport();
  assert.equal(typeof client.apply, 'function');
  assert.equal(client.inject.length, 1);
  assert.equal(client.inject[0], 'theme');
  assert.equal(typeof client.name, 'string');
  assert.ok(client.name.length > 0);
});

test('apply registers one token layer with light/dark pairs', () => {
  const client = loadClientExport();
  let source;
  let tokens;
  let label;
  const ctx = {
    effect(fn, effectLabel) {
      label = effectLabel;
      return fn();
    },
    theme: {
      overrideTokens(layerSource, layerTokens) {
        source = layerSource;
        tokens = layerTokens;
        return () => {};
      },
    },
  };

  client.apply(ctx);

  assert.equal(source, pkg.name);
  assert.match(label, /Nord token layer/);
  const entries = Object.entries(tokens);
  assert.ok(entries.length >= 120, `expected at least 120 tokens, got ${entries.length}`);
  for (const [name, value] of entries) {
    assert.match(name, /^--[a-z0-9-]+$/);
    assert.equal(typeof value.light, 'string');
    assert.equal(typeof value.dark, 'string');
    assert.ok(value.light.length > 0 && value.dark.length > 0);
  }
  assert.equal(tokens['--dsw-alias-link'].light, '#4C6F96');
  assert.equal(tokens['--dsw-alias-link'].dark, '#88C0D0');
  assert.equal(tokens['--dsw-static-neutral-bluish-950'].light, '#2E3440');
  assert.equal(tokens['--dsw-static-neutral-bluish-950'].dark, '#2E3440');
});

test('host half is a no-op plugin with a diagnostic name', async () => {
  const host = await import(new URL('lib/index.js', root));
  assert.equal(typeof host.apply, 'function');
  assert.equal(typeof host.name, 'string');
  assert.doesNotThrow(() => host.apply({}));
});
