./compile.sh

java -cp ".:lib/junit.jar:lib/hamcrest-core.jar:lib/selenium-server-standalone.jar:bin" org.junit.runner.JUnitCore homepage.ListVisibility homepage.LinkToMainPage room.Opening room.Searching room.SearchingNotExisting room.CreatingWithEmptyRoomName room.CreatingWithOnlySpaceInName room.CreatingWithNameOfExistingRoom room.CreatingCancelButton room.CreatingHappyPath room.CreatingWithNameAsSQLStatement room.CreatingWithNameWithSpace room.CreatingNameWithSpecialCharacters homepage.JoinRoomButton room.LeavingOneRoomAmongManyRooms room.SimpleLeaving message.PostingEmpty message.InputBoxShouldBeEmptyAfterPosting message.PostingSimple room.Switching message.PostingOneAfterAnother message.PostingWithSpecialCharacters login.LoginUserWhenUserHasNeverAuthenticatedWithGoogleBeforeOnTheMachine
