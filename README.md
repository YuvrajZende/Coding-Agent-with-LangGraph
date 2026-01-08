# AI Code Generator

Multi-agent AI system that automatically generates code projects using LangGraph.

## Features

- **Multi-Agent Architecture**: 3 specialized AI agents (Planner, Architect, Coder) working together
- **Web Interface**: Clean Streamlit UI with real-time progress
- **Automatic Code Generation**: Input an idea, get complete HTML/CSS/JavaScript projects
- **Fast LLM**: Uses Groq API for 10x faster response times

## Quick Start

### Prerequisites
- Python 3.11 or 3.12
- Groq API key (free from [console.groq.com](https://console.groq.com))

### Installation

```bash
# Clone repository
git clone https://github.com/YuvrajZende/Coding-Agent-with-LangGraph
cd Coding-Agent-with-LangGraph

# Create virtual environment
python3.11 -m venv venv311
venv311\Scripts\activate  # Windows
# or
source venv311/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Set up API key
echo "GROQ_API_KEY=your_key_here" > .env
```

### Run

**Web UI:**
```bash
streamlit run app.py
```

**Command Line:**
```bash
python main.py
```

## How It Works

```
User Input → Planner Agent → Architect Agent → Coder Agent → Generated Code
```

1. **Planner**: Analyzes user request and creates project plan
2. **Architect**: Breaks plan into specific implementation tasks  
3. **Coder**: Writes actual code files using LangChain tools

## Project Structure

```
├── agent/              # Core AI agent logic (see agent/README.md)
│   ├── graph.py       # Agent definitions and workflow
│   ├── states.py      # Pydantic data models
│   ├── prompts.py     # Agent instructions
│   └── tools.py       # File operations
├── app.py             # Streamlit web interface
├── main.py            # CLI interface
└── requirements.txt   # Dependencies
```

## Technologies

- **LangGraph** - Multi-agent orchestration
- **Groq** - Fast LLM API (llama-3.1-70b)
- **LangChain** - Tool calling framework
- **Streamlit** - Web interface
- **Pydantic** - Data validation

## Examples

```
Input: "Build a simple calculator"
Output: index.html, styles.css, script.js, README.md

Input: "Create a todo list"
Output: Complete todo app with local storage

Input: "Make a contact form"
Output: Form with validation and styling
```

## Limitations

- Generates HTML/CSS/JavaScript only (no backend)
- Free tier rate limits apply
- Best for simple web projects

## License

MIT

---

Built with LangGraph • Groq • Python
