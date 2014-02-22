package login;

import com.thoughtworks.selenium.*;

public class LoginHelper {
    public static void Login(Selenium selenium) throws Exception {
        selenium.open("/");
        Thread.sleep(3000);
        selenium.click("link=Sign in with Google");
        selenium.waitForPopUp("Authorization", "30000");
        selenium.selectWindow("name=Authorization");
        selenium.type("id=Email", "corpochat.user@gmail.com");
        selenium.type("id=Passwd", "corpopassword");
        selenium.click("id=signIn");
        Thread.sleep(5000);
        selenium.selectWindow("null");
    }
}