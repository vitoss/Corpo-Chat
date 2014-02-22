package room;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

import common.*;
import login.LoginHelper;

public class Switching {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", Config.HomePageUrl);
		selenium.start();
	}

	@Test
	public void testSwitching() throws Exception {
		LoginHelper.Login(selenium);

		selenium.open(Config.HomePageUrl);
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isElementPresent("css=li.room.ng-scope > a.button")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		Thread.sleep(1000);
		selenium.click("css=li.room.ng-scope > a.button");
		Thread.sleep(1000);
		selenium.click("link=Join existing room");
		Thread.sleep(1000);
		selenium.click("css=.room:nth-child(5) a");
		Thread.sleep(1000);
		selenium.click("link=Room 0");
		Thread.sleep(1000);
		assertEquals("Room 0", selenium.getText("css=.row h1"));
		selenium.click("link=Room 4");
		Thread.sleep(1000);
		assertEquals("Room 4", selenium.getText("css=.row h1"));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
