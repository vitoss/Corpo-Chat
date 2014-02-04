import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;


public class LogIn
{
 private Selenium selenium;
 private String nameLoginWindow;
 private String nameHomepage;
    
 @Before
 public void setUp() throws Exception
 {
  nameLoginWindow = "Login Window";
  nameHomepage = "Homepage";
  selenium = new DefaultSelenium("localhost", 4444, "*firefox", "http://localhost:8080/");
  selenium.start();
 }
  
 @Test
 public void logTest()
 {
  String login, password;
  boolean war;
        
  login = "adam";
  password = "komx86";
  war = true;
  selenium.open("/AiMSI/");
  try
  {
   assertEquals(nameLoginWindow, selenium.getTitle());      //sprawdzenie czy otworzyla sie pierwsza strona
  }
  catch(Throwable error1)
  {
   System.out.println("Blad otwarcia strony " + nameLoginWindow);
   war = false;
  }
        
  if(war == true)
  {
   selenium.type("name=login", login);      //name - nazwa pola do wpisania loginu
   selenium.type("name=haslo", password);       //name - nazwa pola do wpisywania hasla
   selenium.click("name=przycisk");                //name - nazwa przycisku 
   selenium.waitForPageToLoad("30000");
   
   try
   {
    assertEquals(nameHomepage, selenium.getTitle());    //sprawdzanie czy otworzyla sie druga stona
   }
   catch(Throwable error2)
   {
    System.out.println("Blad otwarcia stony " + nameHomepage);
   }
  }
 }
 
 @After
 public void tearDown() throws Exception
 {
  selenium.stop();
 }
} 
