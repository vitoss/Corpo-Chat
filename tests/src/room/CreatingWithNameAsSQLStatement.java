package room;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

import common.*;

public class CreatingWithNameAsSQLStatement {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", Config.HomePageUrl);
		selenium.start();
	}

	@Test
	public void testCreatingWithNameAsSQLStatement() throws Exception {
		selenium.open(Config.HomePageUrl);
		Thread.sleep(1000);
		selenium.click("link=Create room");
		Thread.sleep(1000);
		selenium.type("css=input.name", selenium.getEval("Math.floor(Math.random()*100000) + ';  SHOW TABLES;  '"));
		selenium.click("css=a.submit");
		Thread.sleep(1000);
		assertEquals(1, selenium.getCssCount("css=input.msg"));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
