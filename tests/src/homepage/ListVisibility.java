package homepage;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;
import common.*;
import login.LoginHelper;

public class ListVisibility {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", Config.HomePageUrl);
		selenium.start();
	}

	@Test
	public void testListVisibility() throws Exception {
		LoginHelper.Login(selenium);
		
		selenium.open(Config.HomePageUrl);
		Thread.sleep(3000);
		assertEquals(10, selenium.getCssCount("css=.room"));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
