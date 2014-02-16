package homepage;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

import common.*;

public class JoinRoomButton {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", Config.HomePageUrl);
		selenium.start();
	}

	@Test
	public void testJoinRoomButton() throws Exception {
		selenium.open(Config.HomePageUrl);
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isElementPresent("css=li.room.ng-scope > a.button")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		Thread.sleep(1000);
		selenium.click("css=li.room.ng-scope > a.button");
		Thread.sleep(1000);
		assertEquals("Room 0", selenium.getText("css=.row h1"));
		selenium.click("link=Join existing room");
		assertEquals(1, selenium.getCssCount("css=.searchBox"));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
