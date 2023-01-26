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
- Load saved row data from localStorage:
  - Object with key/value pairs:
    {
    timestamp: date,
    9: [text, type]
    10: [text, type]
    ... etc
    }
- Style each diary row based on the current time:
  - Rows that fall BEFORE the current hour;
  - Row this is current hour;
  - Rows that fall AFTER current hour;
- Style select option with colour coding based on dropdown selection;
- Save row data to localStorage using correct format
