"""
AI Code Generator - Command Line Interface
"""

import sys
import argparse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from agent.graph import agent
from agent.tools import init_project_root

init_project_root()


def main():
    parser = argparse.ArgumentParser(description="AI Code Generator")
    parser.add_argument("--recursion-limit", type=int, default=150, help="Maximum recursion limit for agent")
    args = parser.parse_args()
    
    print("\n" + "="*60)
    print("AI CODE GENERATOR - Multi-Agent System")
    print("="*60)
    print("Powered by: LangGraph + Groq")
    print("="*60 + "\n")
    
    try:
        user_prompt = input("Enter your project idea: ")
        
        if not user_prompt.strip():
            print("Error: Please provide a project description")
            return
        
        print(f"\n{'-'*60}")
        print("Starting AI agents...")
        print(f"{'-'*60}\n")
        
        result = agent.invoke(
            {"user_prompt": user_prompt},
            {"recursion_limit": args.recursion_limit}
        )
        
        print(f"\n{'-'*60}")
        print("PROJECT GENERATED SUCCESSFULLY")
        print(f"{'-'*60}")
        print("Check the 'generated_project' folder for your files")
        print(f"{'-'*60}\n")
        
    except KeyboardInterrupt:
        print("\n\nProcess cancelled by user")
        sys.exit(0)
    except Exception as e:
        print(f"\n{'-'*60}")
        print(f"ERROR: {str(e)}")
        print(f"{'-'*60}")
        sys.exit(1)


if __name__ == "__main__":
    main()