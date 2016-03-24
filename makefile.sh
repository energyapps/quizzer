DIR="$(dirname "$0")"
cd $DIR
echo "Script running in the directory $DIR"


EMPTY="" #this is our password.

# Run the script for the first xlsx that is not template
for i in `find *.xlsx`
do
    TYPE="$(echo $i | rev | cut -c1-13 | rev)"
    if [ "$TYPE" != "template.xlsx" ]; then    	    	
    	TYPE=$i
    	echo
    	echo
    	echo "Quiz will be generated on $TYPE"
    	echo
    	echo
    	break
    	#break out of loop and only run on the first xlsx alphabetically
    fi
done

#Make the date a variable
TODAY=$(date +%y-%m-%d)
echo "Today's Date is $TODAY"

#make a random string for this process of 6
NEW_UUID=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | fold -w 6 | head -n 1)
echo "This random ID is $NEW_UUID"

pwd

#Run Openpxyl and csvkit to get from a xlsx to a few csvs, use the CSV name 
./assets/scripts/makecsv.sh $TYPE $TODAY $NEW_UUID

#Run csvkit to get the needed json out of csv on the other end. 
./assets/scripts/makejson.sh

#Run the script that places the new json in doms!!!
python assets/scripts/createdom.py

#what to do now? Rearrange all the shiz and package it up into a zip/folder
cd assets
zip -r quiz-$NEW_UUID.zip quiz/
mv quiz-$NEW_UUID.zip ../quiz-$NEW_UUID.zip
cd ..
echo
echo "Success! You may now unzip your quiz.zip files and load them into the CMS"
echo
