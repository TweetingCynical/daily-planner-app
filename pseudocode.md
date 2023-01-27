# Daily Planner

# Pseudocode for how to build Daily Planner

Steps to achieving the working Daily Planner App:

- On page load, display current date and time on header;
- Update time every second so that it changes on the change of each minute;
- Create the diary structure on page:
  - Hour time;
  - Task text area;
  - Type select options;
  - Save button
- Load saved row data from localStorage, checking that the saved date of any options are on today's date:
  - Object with key/value pairs:
    {
    timestamp: date,
    9: [text, type, saved]
    10: [text, type, saved]
    ... etc
    }
- Style each diary row based on the current time:
  - Rows that fall BEFORE the current hour (faded purple);
  - Row this is current hour (orange);
  - Rows that fall AFTER current hour (faded orange);
- Create the styling such that it changes on the hour change
- Save row data to localStorage using correct format
