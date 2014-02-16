package room;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

import common.*;

public class CreatingCancelButton {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", Config.HomePageUrl);
		selenium.start();
	}

	@Test
	public void testCreatingCancelButton() throws Exception {
		selenium.open(Config.HomePageUrl);
		Thread.sleep(1000);
		selenium.click("link=Create room");
		Thread.sleep(1000);
		selenium.type("css=input.name", selenium.getEval("'TestRoom'+Math.floor(Math.random()*100000)"));
		selenium.click("css=a.cancel");
		Thread.sleep(1000);
		assertEquals(1, selenium.getCssCount("css=.searchBox"));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
