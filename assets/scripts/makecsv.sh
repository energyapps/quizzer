#start by converting the xlsx to 3 multiple xlsx's
python assets/scripts/multiples.py $1

#convert these three xlsx's to csv
in2csv assets/wb1.xlsx > assets/data.csv
in2csv assets/wb2.xlsx > assets/header.csv
in2csv assets/wb3.xlsx > assets/footer.csv

#delete xlsx files
rm assets/wb1.xlsx assets/wb2.xlsx assets/wb3.xlsx

# make the xlsx backup folder if it doesn't exist yet
mkdir assets/xlsx

# trim the file extension off the end of the data
DATA="$(echo $1 | rev | cut -c 6- | rev)"

cd assets/quiz
find . -name "*.xlsx" -type f -delete
cd ../..

#make a copy of the original data
cp $1 assets/xlsx/$DATA-$2-$3.xlsx
cp $1 assets/quiz/$DATA-$2-$3.xlsx


