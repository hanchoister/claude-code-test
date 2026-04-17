# Claude Code Shortcuts — Cursor IDE Reference

---

## 1. CLI / Terminal Shortcuts

These work when running `claude` in Cursor's integrated terminal.

### Core Input

| Shortcut | Action |
|----------|--------|
| `Enter` | Submit message |
| `Ctrl+J` | Insert newline without submitting |
| `Escape` | Cancel current input |
| `Escape Escape` | Clear input completely |
| `Ctrl+C` | Interrupt / cancel running operation |
| `Ctrl+D` | Exit Claude Code |
| `Ctrl+S` | Stash current prompt (auto-restores later) |
| `Ctrl+B` | Background current task while Claude is working |
| `Ctrl+V` | Paste image |
| `Ctrl+L` | Clear prompt input and redraw screen |

### History Navigation

| Shortcut | Action |
|----------|--------|
| `Up Arrow` | Previous history item |
| `Down Arrow` | Next history item |
| `Ctrl+R` | Open history search |

### Bash-Style Line Editing

| Shortcut | Action |
|----------|--------|
| `Ctrl+A` | Move to start of line |
| `Ctrl+E` | Move to end of line |
| `Option+F` (Alt+F) | Move forward one word |
| `Option+B` (Alt+B) | Move backward one word |
| `Ctrl+W` | Delete previous word |

### Transcript & Display

| Shortcut | Action |
|----------|--------|
| `Ctrl+O` | Toggle verbose transcript display |
| `Ctrl+T` | Toggle task list visibility |
| `Q` / `Escape` | Exit transcript view |

---

## 2. Cursor IDE Extension Shortcuts

Install the extension: open Cursor, press `Cmd+Shift+X`, search "Claude Code", install. Or paste `cursor:extension/anthropic.claude-code` in your browser.

All VS Code extension shortcuts work identically in Cursor.

| Shortcut (macOS) | Shortcut (Win/Linux) | Action |
|------------------|----------------------|--------|
| `Cmd+Esc` | `Ctrl+Esc` | Toggle focus between editor and Claude prompt |
| `Cmd+N` | `Ctrl+N` | Start new conversation |
| `Cmd+Shift+Esc` | `Ctrl+Shift+Esc` | Open new conversation in new tab |
| `Option+K` | `Alt+K` | Insert @-mention for selected file/lines |
| `Shift+Enter` | `Shift+Enter` | Add newline without sending (IDE panel) |
| `Cmd+Shift+P` | `Ctrl+Shift+P` | Command Palette — type "Claude Code" to see all commands |

> **Note:** `Cmd+N` for new conversation requires `enableNewConversationShortcut: true` in `~/.claude/settings.json`.

---

## 3. Permission Mode Cycling

`Shift+Tab` cycles through modes in both the CLI and IDE panel:

| Mode | Behavior |
|------|----------|
| **Normal** | Claude asks for approval before each action |
| **Plan** | Claude shows a plan and waits for your approval before making changes |
| **Auto-Accept** | Claude makes edits without asking |

---

## 4. Slash Commands

Type `/` in the prompt to open the command menu. All commands work in the CLI; a subset works in the IDE panel.

| Command | Description |
|---------|-------------|
| `/help` | Show all available shortcuts and commands |
| `/ide` | Connect Claude Code CLI to the current Cursor IDE window |
| `/keybindings` | Open `~/.claude/keybindings.json` to customize shortcuts |
| `/config` | Open configuration settings |
| `/doctor` | Run diagnostics and check for keybinding warnings |
| `/compact` | Manually compact the context window |
| `/resume` | Interactive picker to resume a previous conversation |
| `/rename` | Rename the current session |
| `/mcp` | Manage Model Context Protocol servers |
| `/plugins` | Browse and manage plugins |
| `/intro` | Create or edit `CLAUDE.md` project instructions |
| `/terminal-setup` | Configure terminal (e.g. Option+Enter for newline) |
| `/install-github-app` | Set up GitHub PR review automation |
| `/usage` | View plan / token usage statistics |

---

## 5. Customizing Keybindings

Run `/keybindings` to open `~/.claude/keybindings.json`. Changes apply immediately — no restart needed.

### Syntax

```json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+u": null
      }
    }
  ]
}
```

Set a value to `null` to unbind a default shortcut.

### Modifier keys
`ctrl`, `alt` / `opt` / `option`, `shift`, `meta` / `cmd` / `command`

### Chord syntax
`ctrl+k ctrl+s` — press the first chord, release, then press the second.

### Reserved (cannot be rebound)

| Shortcut | Reason |
|----------|--------|
| `Ctrl+C` | Hardcoded interrupt signal |
| `Ctrl+D` | Hardcoded exit |
| `Ctrl+M` | Identical to Enter in terminals |

---

## 6. Cursor-Specific Setup Notes

| Topic | Detail |
|-------|--------|
| Install extension | `Cmd+Shift+X` → search "Claude Code", or open `cursor:extension/anthropic.claude-code` |
| Connect CLI to IDE | Run `claude` in Cursor's terminal, then type `/ide` |
| Diff display | Edits appear in Cursor's native diff viewer (not just terminal output) |
| Diagnostics | Cursor shares language server diagnostics with Claude Code automatically |
| tmux conflict | `Ctrl+B` is the tmux prefix — press twice to pass through to Claude |
| GNU screen conflict | `Ctrl+A` is the screen prefix — same workaround applies |
