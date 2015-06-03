# Make the csv become the JSON
# IF Error, throw error
# IF no error, continue
# mv data.csv data_YY_MM_DD_RAND.csv

mkdir assets/json

#transform the data into a json
csvjson assets/data.csv > assets/json/data.json

### TEST TO MAKE SUREthat each has 4 answers, each is validated, that the data has the correct names.
# make sure that each column is named correctlyu using csvstat

csvjson assets/footer.csv > assets/json/footer.json
csvjson assets/header.csv > assets/json/header.json

#remove csv intermediates.
rm assets/footer.csv assets/header.csv assets/data.csv