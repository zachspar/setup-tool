# Setup Tool Action

> [!NOTE]
> This action is geared toward setting up simple CLI tools from a tarball URL.

A GitHub Action to setup _any_ tool.

## Usage

```yaml
- uses: zachspar/setup-tool@v0.1.0
  with:
    # Description: The name of the tool to setup.
    # Required: false
    # Default: 'tool'
    name: 'tool-name'

    # Description: The tarball URL to download the tool.
    # Required: true
    tarball-url: 'https://example.com/tool.tar.gz'
```

## Example

See the example below that sets up a tool called
[`yq`](https://github.com/mikefarah/yq).

```yaml
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v4

  - name: Setup Tool
    id: setup-tool
    uses: zachspar/setup-tool@v0.1.0
    with:
      name: 'yq'
      tarball-url: 'https://github.com/mikefarah/yq/releases/download/v4.44.2/yq_linux_amd64.tar.gz'

  - name: Print Tool Path
    run: echo "${{ steps.setup-tool.outputs.tool-path }}"
```
