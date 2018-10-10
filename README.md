**initial.js**
==========
Simple jQuery plugin to make Gmail like text avatars for profile pictures.

---

[Demo][1]
--
Browser compatibility
---

 - Chrome
 - Firefox
 - Opera 9+
 - Safari 3.2+
 - iOS Safari 3.2+
 - Android Browser 3+ 

Usage
--
 
**Markup**

>  &lt;img data-name=&quot;Steve&quot; data-color=&quot;#85e0ce&quot; class=&quot;profile&quot;/&gt;

**jQuery code**

 > $('.profile').initial(); 


  [1]: http://judelicio.us/initial.js/
  
  Options
--
**Below options can be overridden with data-attributes inside the image element. Refer to the "data-attribute" column for related data-attribute for each option**

| Option      | data-attribute   | Description                                                         | Default                                                                                            |
|-------------|------------------|---------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| name        | data-name        | Name of the user which the profile picture should be generated      | Name                                                                                               |
| lastName    | data-last-name   | Last name of the user which the profile picture should be generated | NULL                                                                                               |
| height      | data-height      | Height of the picture                                               | 100                                                                                                |
| width       | data-width       | Width of the picture                                                | 100                                                                                                |
| charCount   | data-char-count  | Number of characherts to be shown in the picture.                   | 1                                                                                                  |
| textColor   | data-text-color  | Color of the text                                                   | #ffffff                                                                                            |
| fontSize    | data-font-size   | Font size of the character(s)                                       | 60                                                                                                 |
| fontWeight  | data-font-weight | Font weight of the character(s)                                     | 400                                                                                                |
| radius      | data-radius      | Rounded corners                                                     | 0                                                                                                  |
| seed        | data-seed        | Number to randomize the background color                            | 0                                                                                                  |
| color        | data-color        | Background color of the profile picture that should be generated | null

