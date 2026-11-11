# Releasing

Releases are published by a tag-triggered GitHub Actions workflow
(`.github/workflows/release.yml`), mirroring the sibling `dsh-web-ask-aside`
project. The workflow checks the package, verifies the tag matches
`package.json`, skips an already-published version, publishes with provenance,
and creates the GitHub release.

## First release (bootstrap)

npm trusted publishing can only be configured for a package that already
exists, so version 0.1.0 needs one non-OIDC publish. Choose one path.

### A. Publish 0.1.0 from Actions with a bootstrap token

1. Create an npm **Automation** or **Granular** access token with publish
   rights and 2FA bypass at
   <https://www.npmjs.com/settings/yusiwen/tokens>.
2. Store it as a repository secret (paste it at the prompt; do not commit it):

   ```sh
   gh secret set NPM_TOKEN -R yusiwen/dsh-web-theme-nord
   ```

3. Tag and push:

   ```sh
   git switch main && git pull --ff-only
   git tag -s v0.1.0 -m "v0.1.0"
   git push origin v0.1.0
   ```

   The `Release` workflow publishes 0.1.0 with the token and creates the
   GitHub release.

### B. Publish 0.1.0 manually

```sh
npm publish --access public
```

Enter the one-time password when npm asks. The same tag flow publishes later
versions.

## Configure trusted publishing

Once 0.1.0 exists, connect the package to this repository and workflow:

```sh
npm trust github dsh-web-theme-nord --file release.yml \
  --repo yusiwen/dsh-web-theme-nord --allow-publish
```

The command asks for a one-time password. The package settings page on npmjs.com
offers the same configuration. If you used path A, delete the bootstrap secret:

```sh
gh secret delete NPM_TOKEN -R yusiwen/dsh-web-theme-nord
```

## Later releases

Bump `package.json` (and `CHANGELOG.md`), commit, then tag the merged commit:

```sh
git switch main && git pull --ff-only
git tag -s v0.1.1 -m "v0.1.1"
git push origin v0.1.1
```

The workflow authenticates through OIDC; no npm token or OTP is involved.
