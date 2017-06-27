DIR="$(dirname "$0")"
cd $DIR

EMPTY="" #this is our password.

# Run the script for the first xlsx that is not template
for i in `find *.xlsx`
do
    TYPE="$(echo $i | rev | cut -c1-13 | rev)"
    if [ "$TYPE" != "template.xlsx" ]; then    	    	
    	TYPE=$i
    	echo
    	echo
    	echo "Quiz will be generated on $TYPE. Hold onto your butts"
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

# pwd

#Run Openpxyl and csvkit to get from a xlsx to a few csvs, use the CSV name 
echo "leaving makefile.sh for makecsv.sh"
./assets/scripts/makecsv.sh $TYPE $TODAY $NEW_UUID
echo "back in makefile.sh from makecsv.sh"
#Run csvkit to get the needed json out of csv on the other end. 
echo "leaving makefile.sh for makejson.sh"
./assets/scripts/makejson.sh
echo "back in makefile.sh from makejson.sh"

#Run the script that places the new json in doms!!!
echo "leaving makefile.sh for createdom.py"
python assets/scripts/createdom.py
echo "back in makefile.sh from createdom.py"

#what to do now? Rearrange all the shiz and package it up into a zip/folder
echo "zip everything up"
cd assets
zip -r quiz-$NEW_UUID.zip quiz/
mv quiz-$NEW_UUID.zip ../quiz-$NEW_UUID.zip
cd ..
echo
echo "Completed! You may now unzip your quiz.zip files and load them into the CMS. If there were errors above then fix it!"
echo
