# PlacementsTeaser

## Running 

Download / Clone 
Start a web server


##Use cases tackled
1. The user should be able browse through the line-item data as either a list or table (ie. pagination or infinite-scrolling).
  * This seemed to be the meat of the data and needed implementing
  * Went with a simple pagination for times sake
2. The user should be able to see each line-item's billable amount (sub-total = actuals + adjustments).
  * Billable amount actually seems more important than actual, booked, or adjustments
3. The user should be able to see the invoice grand-total (sum of each line-item's billable amount).
  * It's supposed to be an invoice so a grand total is pretty important.
