const escapeHTML = str => str.replace(/[&<>'"]/g, 
  tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag]));


console.log(escapeHTML("Test <strong>code with html tags</strong>"));


console.log(escapeHTML(";There are no unusual scripts              <img src='non.existing.image' style='display:none;' onerror=&quot;alert('MWA HA HA!!!! I am running my own javascript here! \n\nI didn\&apos;t have to warn you. I could just quietly run whatever I want anytime the preview of this perfectly innocent website loads! \n\nThen all I\&apos;d have to do is steal someone\&apos;s session login info. Or I could listen for someone to type in their password or something. \n\nMWA HA HA HA HA HA !!!');&quot; />               or anything on this page."));
    