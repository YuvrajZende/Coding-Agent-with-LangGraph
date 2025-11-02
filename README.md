# LangGraph Project - Engineering Project Planner

## What is this?

This is my first attempt at building an AI agent system using LangGraph! It's basically an AI that can plan, architect, and code entire software projects automatically. Pretty cool stuff.

## What I learned

### 1. LangGraph is awesome but tricky
- LangGraph lets you create workflows with multiple AI agents that work together
- Each agent has a specific job (planner, architect, coder)
- The agents pass information between each other using a shared state
- Getting the state management right was the hardest part!

### 2. Multi-agent systems
I created three different agents:
- **Planner Agent**: Takes user input and creates a high-level project plan
- **Architect Agent**: Breaks down the plan into specific coding tasks
- **Coder Agent**: Actually writes the code files using tools

### 3. Pydantic for data validation
Used Pydantic models to make sure data between agents is structured properly:
- `Plan` - holds the overall project structure
- `TaskPlan` - list of implementation tasks
- `CoderState` - tracks progress through coding tasks

### 4. Tool integration
The coder agent can actually interact with the file system:
- Read existing files
- Write new files
- List directories
- Run shell commands

This was mind-blowing - an AI that can actually create real files!

## How to run it

**Important**: Use Python 3.11 or 3.12 (Python 3.14+ has compatibility issues with LangChain)

1. Create a virtual environment with Python 3.11:
```bash
python3.11 -m venv venv311
venv311\Scripts\activate
```

2. Install dependencies:
```bash
pip install groq langchain langchain-core langchain-groq langgraph pydantic python-dotenv
```

3. Set up your Groq API key in `.env`:
```
GROQ_API_KEY=your_key_here
```

4. Run the main script:
```bash
python main.py
```

5. Enter your project idea when prompted!

## Example

I tested it with "create a simple calculator app" and it actually generated a working calculator with HTML, CSS, and JavaScript files. Not perfect, but pretty impressive for a first try.

## What I struggled with

- **Python version compatibility** - Had to use Python 3.11 instead of 3.14 due to LangChain dependencies
- Import statements (relative vs absolute imports are confusing)
- State management between agents
- Getting the conditional edges right in the graph
- Tool function docstrings (LangChain requires proper docstrings for all tools)
- Path validation for file operations
- Debugging LangGraph workflows (still learning this)
- Making sure the AI agents don't go into infinite loops

## What's next

- Add better error handling
- Make the generated code more robust
- Add support for different programming languages
- Maybe add a reviewer agent to check the code quality
- Learn more about prompt engineering to get better results

## Dependencies

- `langgraph` - for the multi-agent workflow
- `langchain` - AI framework
- `groq` - fast LLM inference
- `pydantic` - data validation
- `python-dotenv` - environment variables

---

*This was a fun learning project! Still lots to improve but I'm excited about what AI agents can do.*