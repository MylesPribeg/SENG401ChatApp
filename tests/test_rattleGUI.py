# Generated by Selenium IDE
import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestRattleGUI():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_testAddGroup(self):
    self.driver.get("http://localhost:5173/")
    self.driver.set_window_size(1511, 875)
    self.driver.find_element(By.CSS_SELECTOR, ".MuiBox-root > button").click()
    self.driver.find_element(By.CSS_SELECTOR, "input:nth-child(2)").click()
    self.driver.find_element(By.CSS_SELECTOR, "input:nth-child(2)").send_keys("NewGroup")
    self.driver.find_element(By.CSS_SELECTOR, "button:nth-child(3)").click()
    elements = self.driver.find_elements(By.CSS_SELECTOR, ".group:nth-child(2)")
    assert len(elements) > 0
  
  def test_testAddUser(self):
    self.driver.get("http://localhost:5173/")
    self.driver.set_window_size(1511, 875)
    self.driver.find_element(By.CSS_SELECTOR, ".group-name").click()
    self.driver.find_element(By.CSS_SELECTOR, ".addUsers > button:nth-child(1)").click()
    self.driver.find_element(By.CSS_SELECTOR, "input:nth-child(2)").click()
    self.driver.find_element(By.CSS_SELECTOR, "input:nth-child(2)").send_keys("monkey")
    self.driver.find_element(By.CSS_SELECTOR, "button:nth-child(3)").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group-name").click()
    elements = self.driver.find_elements(By.CSS_SELECTOR, ".member:nth-child(2)")
    assert len(elements) > 0
  
  def test_testChangeFontColour(self):
    self.driver.get("http://localhost:5173/")
    self.driver.set_window_size(1512, 875)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(3) > .MuiButtonBase-root").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group").click()
    time.sleep(5)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(3) > .MuiButtonBase-root").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group").click()
    time.sleep(5)
  
  def test_testChangeFontStyles(self):
    self.driver.get("http://localhost:5173/")
    self.driver.set_window_size(1512, 875)
    self.driver.find_element(By.CSS_SELECTOR, ".group-name").click()
    time.sleep(5)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(3) > .MuiButtonBase-root").click()
    self.driver.find_element(By.CSS_SELECTOR, ".oblique").click()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group").click()
    time.sleep(5)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(3) > .MuiButtonBase-root").click()
    self.driver.find_element(By.CSS_SELECTOR, ".Courier").click()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group-name").click()
    time.sleep(5)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    element = self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(3) > .MuiButtonBase-root")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(3) > .MuiButtonBase-root").click()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".Arial").click()
    self.driver.find_element(By.CSS_SELECTOR, ".normal").click()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group-name").click()
    time.sleep(5)
  
  def test_testLeaveGroup(self):
    self.driver.get("http://localhost:5173/")
    self.driver.set_window_size(1511, 875)
    self.driver.find_element(By.CSS_SELECTOR, ".group:nth-child(2)").click()
    self.driver.find_element(By.CSS_SELECTOR, ".addUsers > button:nth-child(2)").click()
    elements = self.driver.find_elements(By.CSS_SELECTOR, ".group:nth-child(2)")
    assert len(elements) == 0
  
  def test_testLogin(self):
    self.driver.get("http://localhost:5173/login")
    self.driver.set_window_size(1511, 875)
    self.driver.find_element(By.ID, "username").send_keys("Gabon")
    self.driver.find_element(By.ID, "outlined-basic").send_keys("tMB6@Ya3cS53suGs")
    self.driver.find_element(By.CSS_SELECTOR, ".mainButton").click()
    elements = self.driver.find_elements(By.CSS_SELECTOR, ".sub-form")
    assert len(elements) > 0
  
  def test_testSendMessage(self):
    self.driver.get("http://localhost:5173/")
    self.driver.set_window_size(1511, 875)
    self.driver.find_element(By.CSS_SELECTOR, ".group-name").click()
    self.driver.find_element(By.CSS_SELECTOR, "input").click()
    self.driver.find_element(By.CSS_SELECTOR, "input").send_keys("Angel Adept Blind Bodice Clique Coast Dunce Docile Enact Eosin Furlong Focal Gnome Gondola Human Hoist Inlet Iodine Justin Jocose Knoll Koala Linden Loads Milliner Modal Number Nodule Onset Oddball Pneumo Poncho Quanta Qophs Rhone Roman Snout Sodium Tundra Tocsin Uncle Udder Vulcan Vocal Whale Woman Xmas Xenon Yunnan Young Zloty Zodiac.")
    self.driver.find_element(By.CSS_SELECTOR, "input").send_keys(Keys.ENTER)
    elements = self.driver.find_elements(By.CSS_SELECTOR, "div:nth-child(4) .messageContainer")
    assert len(elements) > 0
  
  def test_testLogout(self):
    self.driver.get("http://localhost:5173/login")
    self.driver.set_window_size(1512, 875)
    self.driver.find_element(By.ID, "username").send_keys("Gabon")
    self.driver.find_element(By.ID, "outlined-basic").send_keys("tMB6@Ya3cS53suGs")
    self.driver.find_element(By.CSS_SELECTOR, ".mainButton").click()
    elements = self.driver.find_elements(By.CSS_SELECTOR, "input")
    assert len(elements) > 0
    self.driver.find_element(By.CSS_SELECTOR, ".options > button").click()
    elements = self.driver.find_elements(By.CSS_SELECTOR, ".MuiTypography-root")
    assert len(elements) > 0
    self.driver.find_element(By.ID, "username").send_keys("Gabon")
    self.driver.find_element(By.ID, "outlined-basic").send_keys("tMB6@Ya3cS53suGs")
    self.driver.find_element(By.CSS_SELECTOR, ".mainButton").click()
  
  def test_testChangeThemeSecondaryColours(self):
    self.driver.get("http://localhost:5173/")
    self.driver.set_window_size(1512, 875)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(2) > .MuiButtonBase-root").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(10) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(12) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(14) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group").click()
    time.sleep(5)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(2) > .MuiButtonBase-root").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(10) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(12) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(14) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group").click()
    time.sleep(5)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(2) > .MuiButtonBase-root").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(10) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(12) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(14) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group").click()
    time.sleep(5)
  
  def test_testChangeThemePrimaryColours(self):
    self.driver.get("http://localhost:5173/")
    self.driver.set_window_size(1512, 875)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(2) > .MuiButtonBase-root").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(3) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(5) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(7) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group").click()
    time.sleep(5)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(2) > .MuiButtonBase-root").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(3) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(5) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(7) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group").click()
    time.sleep(5)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(2) > .MuiButtonBase-root").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(3) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(5) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(7) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group").click()
    time.sleep(5)
  
  def test_testChangeThemeColoursCombined(self):
    self.driver.get("http://localhost:5173/")
    self.driver.set_window_size(1512, 875)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(2) > .MuiButtonBase-root").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(3) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(5) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(14) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(12) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(10) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(7) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group").click()
    time.sleep(5)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(2) > .MuiButtonBase-root").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(3) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(5) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(12) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(10) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(14) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(7) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group").click()
    time.sleep(5)
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(2) > div:nth-child(2) > .MuiButtonBase-root").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(3) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(5) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(10) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(14) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(12) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".colourOptions:nth-child(7) .MuiSlider-thumb")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".settings-svg").click()
    self.driver.find_element(By.CSS_SELECTOR, ".group").click()
    time.sleep(5)
  
