# IT22073600
Assignment 1 , ITPM IT3040

Sinhala Transliteration Engine - Test Suite

This project contains an automated testing suite for a Sinhala transliteration web application. It ensures that the engine correctly converts Romanized Sinhala (Singlish) into Sinhala Unicode while maintaining security and handling non-standard user inputs.

## Project Overview

The core functionality revolves around taking phonetic Sinhala input and providing real-time Unicode output. The test suite is divided into three main pillars:

Functional Testing: Verifies standard transliteration accuracy.Robustness (Negative) Testing: Ensures the engine handles typos, symbols, and "noise" without breaking.UI/UX Testing: Checks for real-time responsiveness and typing delays.

## Features Tested

Standard Mapping: Basic words like bank → බැංකුව.
Symbol Handling: Conversion of "leetspeak" or stylized text (e.g., @ as අ).
Character Normalization: Handling excessive repeated letters (e.g., aaaaaaaamma → අම්මා).
Security: Ensuring <script> tags are handled safely and not executed.
URL Detection: Proper handling of web links within the input.

## Setup Guide

1. PrerequisitesEnsure you have the following installed:Node.js (v16 or higher)npm or yarn### 2. InstallationClone the repository and install the dependencies:Bashgit clone <your-repo-url>
cd <project-folder>

###npm install

### 3. Install Playwright BrowsersBashnpx playwright install

### 4. Running TestsYou can run the tests in different modes:Headless Mode (Standard):Bashnpx playwright test

Headed Mode (Watch the browser):Bashnpx playwright test --headed

Show Report:Bashnpx playwright show-report

## Test Configuration
Test ID

CategoryDescription

Neg_Fun_05-09RobustnessTests normalization of repeated characters and symbols.
Neg_Fun_10SecurityXSS injection check to ensure tags are rendered as text.
Pos_UI_01UISimulates human-like typing with delays to test real-time rendering.


JAVIDU HETTIARACHCHI IT3040 ASSIGNMENT 1 ITPM 
