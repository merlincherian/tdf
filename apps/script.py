import re
import PyPDF2
import os
import json
from datetime import datetime

def parse_client_info(pdf_path):
    """
    Parses client name, phone number, email, and event date from a PDF.

    Args:
        pdf_path (str): The path to the PDF file.

    Returns:
        dict: A dictionary containing the extracted information.
              Returns None if any of the information is not found.
    """

    info = {
        "client_name": None,
        "phone_number": None,
        "email": None,
        "event_date": None,
        "event_venue": None,
        "event_description": None,
        "total": None
    }

    try:
        with open(pdf_path, "rb") as pdf_file:
            print(f"Reading PDF file: {pdf_path}")
            reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page_num in range(min(2, len(reader.pages))):  # Read up to the first 2 pages
                page = reader.pages[page_num]
                text += page.extract_text() or ""

        # print("Extracted Text:", text)
        # Extract Client Information
        name_match = re.search(r"Name\s*__\s*(.*?)\s*_", text, re.DOTALL)
        if name_match:
            info["client_name"] = name_match.group(1).replace('\n', ' ').strip()

        phone_pattern = r"\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}"

        # Find all occurrences of phone numbers
        phone_matches = list(re.finditer(phone_pattern, text))

        # Extract the second occurrence of a phone number
        if len(phone_matches) >= 2:
            info["phone_number"] = phone_matches[1].group(0).strip()

        email_matches = list(re.finditer(r"\S+@[\w\.]+\.com", text, re.IGNORECASE))
        if len(email_matches) >= 2:
            info["email"] = email_matches[1].group(0).strip()


        # Extract Event Date
        date_pattern = r"\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}[/-]\d{1,2}[/-]\d{1,2}|[A-Za-z]+\s+\d{1,2},\s+\d{4})\b"
        date_match = re.search(date_pattern, text)
        if date_match:
            info["event_date"] = date_match.group(0).strip()


         # Extract Event Venue
        venue_match = re.search(r"Venue\s*__\s*(.*?)\s*_", text, re.DOTALL)
        if venue_match:
            info["event_venue"] = venue_match.group(1).replace('\n', ' ').strip()

        # Extract Event Description
        description_match = re.search(r"Description\s*__\s*(.*?)\s*_", text, re.DOTALL)
        if description_match:
            info["event_description"] = description_match.group(1).replace('\n', ' ').strip()

        total_match = re.search(r"T\s*o\s*t\s*a\s*l\s*\n*\s*\$?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)", text, re.IGNORECASE)
        if total_match:
            info["total"] = float(total_match.group(1).replace(',', ''))


        return info

    except FileNotFoundError:
        print(f"Error: File not found at {pdf_path}")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def convert_date_format(date_str):
    """
    Converts a date string from 'Month\nDay\nYear' format to 'mm/dd/yyyy' format.

    Args:
        date_str (str): The date string to convert.

    Returns:
        str: The converted date string in 'mm/dd/yyyy' format.
    """
    # Remove newlines and extra spaces
    date_str = date_str.replace('\n', ' ').strip()
    
    # Remove ordinal suffixes (st, nd, rd, th)
    date_str = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', date_str)
    
    # Parse the date string
    try:
        date_obj = datetime.strptime(date_str, "%B %d %Y")
        return date_obj.strftime("%m/%d/%Y")
    except ValueError as e:
        print(f"Error parsing date: {e}")
        return None

# Directory containing the PDF files
contracts_dir = "contracts"
output_file = "output.json"

# List to hold all client data
all_client_data = []

# Iterate over PDF files in the contracts directory
for filename in os.listdir(contracts_dir):
    if filename.endswith(".pdf"):
        pdf_path = os.path.join(contracts_dir, filename)
        client_data = parse_client_info(pdf_path)
        if client_data:
            all_client_data.append(client_data)

# Write all client data to output.json
with open(output_file, "w") as json_file:
    json.dump(all_client_data, json_file, indent=4)

print(f"Client data has been written to {output_file}")