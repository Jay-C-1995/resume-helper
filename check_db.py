import sqlite3
import sys

def check_db():
    db_path = "backend/resume_analyzer.db"
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='resume_analyses'")
        if not cursor.fetchone():
            print(f"Error: Table 'resume_analyses' not found in {db_path}")
            return

        # Query data
        cursor.execute("SELECT id, filename, name, email, role_match_score, created_at FROM resume_analyses ORDER BY id DESC LIMIT 5")
        rows = cursor.fetchall()
        
        if not rows:
            print("Database is empty.")
            return

        print(f"\n{'ID':<5} {'Filename':<30} {'Name':<15} {'Score':<10} {'Time':<20}")
        print("-" * 80)
        
        for row in rows:
            id, filename, name, email, score, created_at = row
            # Handle potential None values
            filename = filename or "N/A"
            name = name or "Unknown"
            score = score if score is not None else 0
            created_at = str(created_at) if created_at else "N/A"
            
            # Truncate long filenames
            if len(filename) > 28:
                filename = filename[:25] + "..."
                
            print(f"{id:<5} {filename:<30} {name:<15} {score:<10} {created_at:<20}")

        conn.close()
        
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_db()
