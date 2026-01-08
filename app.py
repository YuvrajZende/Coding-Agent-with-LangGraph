import streamlit as st
import logging
import pathlib
from agent.graph import agent

st.set_page_config(page_title="AI Code Generator", page_icon="⚙️", layout="wide")

st.markdown("""
<style>
    .main-header {
        text-align: center;
        padding: 1.5rem 0;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 10px;
        margin-bottom: 2rem;
    }
    .log-box {
        background-color: #1e1e1e;
        color: #d4d4d4;
        padding: 1rem;
        border-radius: 5px;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        max-height: 400px;
        overflow-y: auto;
    }
</style>
""", unsafe_allow_html=True)

st.markdown('<div class="main-header"><h1>AI Code Generator</h1><p>Multi-Agent System powered by LangGraph and Groq</p></div>', unsafe_allow_html=True)

col1, col2 = st.columns([3, 1])
with col1:
    user_prompt = st.text_input("Enter your project description", placeholder="Example: a simple calculator, todo list, contact form...")
with col2:
    st.write("")
    st.write("")
    generate_btn = st.button("Generate Code", type="primary", use_container_width=True)

if generate_btn and user_prompt:
    status_container = st.empty()
    log_container = st.empty()
    result_container = st.empty()
    
    class StreamlitLogHandler(logging.Handler):
        def __init__(self, container):
            super().__init__()
            self.container = container
            self.logs = []
            
        def emit(self, record):
            msg = self.format(record)
            self.logs.append(msg)
            log_html = '<div class="log-box">' + '<br>'.join(self.logs) + '</div>'
            self.container.markdown(log_html, unsafe_allow_html=True)
    
    handler = StreamlitLogHandler(log_container)
    handler.setFormatter(logging.Formatter('%(asctime)s - %(message)s', datefmt='%H:%M:%S'))
    
    from agent.graph import logger
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)
    
    try:
        status_container.info("Processing request...")
        
        result = agent.invoke({"user_prompt": user_prompt}, {"recursion_limit": 100})
        
        status_container.success("Project generated successfully")
        
        project_root = pathlib.Path.cwd() / "generated_project"
        
        if project_root.exists():
            result_container.markdown("### Generated Files")
            
            files = [f for f in project_root.glob("*") if f.is_file()]
            
            if files:
                tabs = st.tabs([f.name for f in files])
                
                for i, file_path in enumerate(files):
                    with tabs[i]:
                        content = file_path.read_text(encoding='utf-8')
                        
                        lang_map = {'.html': 'html', '.css': 'css', '.js': 'javascript', '.py': 'python', '.md': 'markdown'}
                        lang = lang_map.get(file_path.suffix, 'text')
                        
                        st.code(content, language=lang, line_numbers=True)
                        
                        st.download_button(
                            label=f"Download {file_path.name}",
                            data=content,
                            file_name=file_path.name,
                            mime="text/plain"
                        )
            else:
                st.warning("No files were generated")
        else:
            st.error("Generated project folder not found")
            
    except Exception as e:
        status_container.error(f"Error: {str(e)}")
        st.exception(e)
    finally:
        logger.removeHandler(handler)

elif generate_btn:
    st.warning("Please enter a project description")

with st.sidebar:
    st.markdown("### About")
    st.markdown("""
    This AI code generator uses three specialized agents:
    
    - **Planner** - Creates project plan
    - **Architect** - Breaks into tasks  
    - **Coder** - Writes the code
    """)
    
    st.markdown("### Example Projects")
    for ex in ["Simple calculator", "Todo list application", "Contact form", "Quote generator", "Digital clock"]:
        st.markdown(f"- {ex}")
    
    st.markdown("### Technology Stack")
    st.markdown("LangGraph, Groq, Streamlit, Python")
