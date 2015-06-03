EMPTY="" #this is empty.

#loop through until csvstat is there
for (( i = 0; i < 10; i++ )); do
	CSVSTAT="$(which csvstat)"
	if [ "$CSVSTAT" != "$EMPTY" ]; then
		echo "You have csvstat!"
		echo "Installation complete" 
		break
	else
		echo "You don't have csvstat!"

		PIP="$(which pip)"
		if [ "$PIP" != "$EMPTY" ]; then
			echo "You have pip, so we're going to install csvkit!"
			sudo pip install csvkit
			sudo pip install --upgrade csvkit
		else
			echo "You don't have pip!"

			EASY="$(which easy_install)"
			if [ "$EASY" != "$EMPTY" ]; then
				echo "You have easy_install, so we're going to update pip!"
				sudo easy_install pip
				# sudo easy_install upgrade pip
				sudo pip install --upgrade setuptools
				
			else
				echo "You don't have easy_install, and I need you to figure out how to install that!!! Google it. Sorry! Then run this again."				
			fi
		fi
	fi
done