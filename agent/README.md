# Agent Module Documentation

This folder contains the core AI agent logic for the code generator.

## Overview

The agent module implements a multi-agent system where three specialized AI agents work together to generate code:

1. **Planner** - Creates project plans
2. **Architect** - Breaks plans into tasks
3. **Coder** - Writes actual code

## Files

### 1. graph.py (Core Orchestration)
**Purpose:** Defines the multi-agent workflow and coordinates agent execution

**Functions: 3 main + setup**

| Function | Parameters | Returns | Purpose |
|----------|------------|---------|---------|
| `planner_agent(state)` | state: dict | dict | Converts user prompt into structured Plan |
| `architect_agent(state)` | state: dict | dict | Breaks Plan into implementation tasks |
| `coder_agent(state)` | state: dict | dict | Writes code files using tools |

**Additional Components:**
- `llm`: ChatGroq instance using "openai/gpt-oss-120b" model
- `logger`: Python logging for progress tracking
- `graph`: StateGraph connecting agents in sequence
- `agent`: Compiled graph ready for execution

**Data Flow:**
```
planner_agent → architect_agent → coder_agent (loops until done)
```

---

### 2. states.py (Data Models)
**Purpose:** Defines Pydantic models for type-safe data passing between agents

**Classes: 5**

| Class | Fields | Purpose |
|-------|--------|---------|
| `File` | path, purpose | Represents a file to be created |
| `Plan` | name, description, techstack, features, files | Project plan from Planner agent |
| `ImplementationTask` | filepath, task_description | Single coding task |
| `TaskPlan` | implementation_steps | Collection of tasks from Architect |
| `CoderState` | task_plan, current_step_idx, current_file_content | Tracks Coder progress |

**Example:**
```python
Plan(
    name="Calculator",
    description="Simple web calculator",
    techstack="HTML, CSS, JavaScript",
    features=["Basic arithmetic", "Clean UI"],
    files=[File(path="index.html", purpose="Main page")]
)
```

---

### 3. prompts.py (Agent Instructions)
**Purpose:** Contains prompt templates that give each agent specific instructions

**Functions: 3**

| Function | Parameter | Returns | Purpose |
|----------|-----------|---------|---------|
| `planner_prompt(user_prompt)` | user_prompt: str | str | Instructions for Planner agent |
| `architect_prompt(plan)` | plan: str | str | Instructions for Architect agent |
| `coder_system_prompt()` | - | str | Instructions for Coder agent |

**Key Constraints Enforced:**
- HTML/CSS/JavaScript only (no backend)
- Flat file structure (no subdirectories)
- Maximum 4-5 files
- No frameworks or build tools

**Example Planner Prompt:**
```
You are an expert web developer for SIMPLE BROWSER-BASED APPLICATIONS ONLY.

CRITICAL CONSTRAINTS:
1. Create a SIMPLE WEB APPLICATION using ONLY: HTML, CSS, and JavaScript
2. DO NOT create backend folders
3. ALL files must be in the ROOT directory
...
```

---

### 4. tools.py (File Operations)
**Purpose:** Provides tools that the Coder agent uses to interact with the file system

**Functions: 6** (4 are tools, 2 are helpers)

| Function | Tool? | Parameters | Returns | Purpose |
|----------|-------|------------|---------|---------|
| `safe_path_for_project(path)` | No | path: str | Path | Security check - prevents writing outside project |
| `write_file(path, content)` | Yes | path: str, content: str | str | Writes content to file |
| `read_file(path)` | Yes | path: str | str | Reads file content |
| `get_current_directory()` | Yes | - | str | Returns project root |
| `list_files(directory)` | Yes | directory: str | str | Lists files in directory |
| `init_project_root()` | No | - | str | Creates output folder |

**Security Feature:**
`safe_path_for_project()` validates all file paths to prevent writing outside `generated_project/` folder.

**Example Usage:**
```python
# Coder agent uses these tools
write_file("index.html", "<html>...</html>")  # Creates file
content = read_file("index.html")  # Reads file
files = list_files(".")  # Lists all files
```

---

## Complete Function Summary

**Total: 17 functions/classes**

| File | Count | Type |
|------|-------|------|
| graph.py | 3 | Functions (agents) |
| states.py | 5 | Classes (data models) |
| prompts.py | 3 | Functions (prompts) |
| tools.py | 6 | Functions (4 tools + 2 helpers) |

---

## Execution Flow

```
1. User enters: "Build a calculator"

2. graph.py: planner_agent()
   - Uses: planner_prompt(user_prompt)
   - Creates: Plan object (states.py)
   - Output: {"plan": Plan(...)}

3. graph.py: architect_agent()
   - Uses: architect_prompt(plan)
   - Creates: TaskPlan with tasks (states.py)
   - Output: {"task_plan": TaskPlan(...)}

4. graph.py: coder_agent() [loops for each task]
   - Uses: coder_system_prompt()
   - Tools: write_file(), read_file(), list_files()
   - Creates: index.html, styles.css, script.js
   - Loops until all tasks done
   - Output: {"status": "DONE"}

5. Result: Generated project in generated_project/
```

---

## Key Design Decisions

1. **Sequential Agents**: Each agent runs in order, building on previous output
2. **Tool-Based Coder**: Coder uses LangChain tools to write files safely
3. **Type Safety**: Pydantic models ensure data consistency between agents
4. **Constraint-Based**: Prompts enforce simple, flat web projects
5. **Stateful Execution**: CoderState tracks progress through tasks

---

## Modifying the System

### To add a new agent:
1. Create agent function in `graph.py`
2. Add to graph with `graph.add_node()`
3. Connect with edges

### To change constraints:
1. Edit prompts in `prompts.py`
2. Modify validation in states if needed

### To add new tools:
1. Add function in `tools.py`
2. Decorate with `@tool`
3. Add to `coder_tools` list in `graph.py`

---

## Dependencies

- **langchain-groq**: LLM integration
- **langgraph**: Multi-agent orchestration
- **langchain-core**: Tool system
- **pydantic**: Data validation
- **python-dotenv**: Environment variables

---

For usage instructions, see main [README.md](../README.md)
