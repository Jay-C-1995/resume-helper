import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Load env vars
load_dotenv()

def init_db():
    # Get database URL from env
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("Error: DATABASE_URL not found in environment variables.")
        return

    print(f"Using Database URL: {database_url}")

    if "sqlite" in database_url:
        print("SQLite detected. Creating tables directly...")
        from database import engine, Base
        import models  # Import models to register them
        Base.metadata.create_all(bind=engine)
        print("Done.")
        return

    # For MySQL/PostgreSQL, try to create database first
    try:
        # Assuming format: driver://user:pass@host:port/dbname
        if "/" in database_url.split("@")[1]:
            base_url = database_url.rsplit("/", 1)[0]
            db_name = database_url.rsplit("/", 1)[1].split("?")[0]
        else:
            print("Could not parse database name. Proceeding with standard creation...")
            from database import engine, Base
            import models
            Base.metadata.create_all(bind=engine)
            return

        print(f"Connecting to server to check database '{db_name}'...")
        # Create engine without DB to create DB
        server_engine = create_engine(base_url)
        
        with server_engine.connect() as conn:
            # MySQL specific
            conn.execute(text(f"CREATE DATABASE IF NOT EXISTS {db_name} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"))
            print(f"Database '{db_name}' ensured.")

    except Exception as e:
        print(f"Warning during database creation: {e}")
        print("Attempting to create tables anyway (database might already exist)...")

    # Create tables
    try:
        from database import engine, Base
        import models  # Import models to register them
        
        print("Creating tables...")
        Base.metadata.create_all(bind=engine)
        print("Tables created successfully!")
    except Exception as e:
        print(f"Error creating tables: {e}")

if __name__ == "__main__":
    init_db()
