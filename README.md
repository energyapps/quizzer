# Energy.gov Quiz Generator Template
The Energy.gov quiz generator is a simple script that runs on your computer, and spits out static html, css, and javascript for you to paste in Energy.gov's cms. 


## Installation
Their are several dependencies for this script to execute on your machine. You may need your admin password handy in order to proceed. If the installation doesn't work, contact me!

1. In the quizzer directory, right click on the `installation.sh` file and select Open With > Terminal.app
2. Process should run and not through errors. 

### Dependencies 
- [csvstat](https://csvkit.readthedocs.org/en/0.9.1/)
- [openpyxl](https://openpyxl.readthedocs.org/en/latest/)
- Python (you should definitely already have this)
- PIP (if you don't have csvstat)
- Easy Install (if you don't have pip)

## Instructions
1. Prepare your xlsx file. You can download the template [here](https://github.com/energyapps/quiz-template/raw/gh-pages/js/data/quizzer/template.xlsx), but its already in your home directory. 
	- Beware of special characters.
	- Load your images into the cms and add those paths to the excel sheet, such as `http://energy.gov/sites/prod/files/image3grid.jpg`
	- Don't forget to update the header and footer information
	- links must be hardcoded in HTML, see below for more info.
2. Copy the quizzer folder and place it in your Documents folder
3. Change the name of your folder to your project name
	- Don't use any spaces or special characters in your folder and file names. 	
4. Copy your xlsx file into this folder
	- If there is more than one xlsx file in the quizzer home directory when you run the script, the script will ONLY run on the first xlsx file.
5. In the quizzer directory, right click on the `makefile.sh` file and select Open With > Terminal.app. Hit Okay, when prompted.
6. Follow the directions as prompted in the terminal.
7. If it completes successfully, you will have:
	- quiz.zip in your home directory 
	- a backup of the xlsx in assets/xlsx. Each has a special character identifier.
8. Unzip your quiz.zip folder
9. Inside the folder, open up preview.html to preview your quiz and correct and errors and rerun the script (it will overwright)
10. Add each file to the DOE cms: Add Content > Map 
	- Add markup.html to MARKUP
	- Add compiled.js to CUSTOM JS
	- Add compiled.css to CUSTOM CSS

## Best Practices/Beware!!!

### Best Practices
- Avoid special characters such as ellipses, emdashes, quotation marks, etc. This will likely cause the script to fail. If excel is automatically causing this to happen, edit your cells to display at plain text. 
- NO SPACES IN EXCEL FILE OR FOLDER NAMES!!!
- Quiz questions aren't required to have images or context info at the end. 
- The quiz can have as many questions as you want, but we recommend under 20.
- The quiz can have as many classifications (footer info) as you wish, but we recommend 3 to 5. Links must be hardcoded (see below)

### BEWARE
- If you want links and special characters you'll have to learn about [links](http://www.w3schools.com/html/html_links.asp), [special characters](https://www.utexas.edu/learn/html/spchar.html), and [spans](http://www.w3schools.com/tags/tag_span.asp) in [HTML](http://www.codecademy.com/en/tracks/web).
- If you rerun the script it will overwrite all of your information, but there is a log of the data you used stored in assets/xlsx.
- Each question needs 4 answers
- Beware, I set up a .gitignore so that csvs and jsons are not added to the repo.


### CSS Classes to use 
If you want to have a section of green text in the title as in the example, use the following `<span class="green-text">HIGHLIGHTED TEXT</span>`

## Wish List
- Seperate out installer into a new script
- Validate xlsx entries and ensure that unicode errors aren't present, i.e. looking out for special characters and rejecting or correcting if possible. 
- Social Sharing score information on facebook and twitter
- Make it automatically okay with 2 answers
- Make it throw an error if there's not 2 or 4 answers. 
- ability to run script from json or csv stage
