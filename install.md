# PENTAHO VIZ 

## front-end para sparkl endpoints

### Install 

- Copy app folder to `tomcat/webapps/pentaho/mantle/home/content`
- Copy index.jsp to `tomcat/webapps/pentaho/mantle/home` and rename old file to index_old.jsp
- Copy cagece-mantle to `tomcat/webapps/pentaho/mantle/themes` and rename to cagece
- Copy cagece-global to `pentaho-solutions/system/common-ui/resources/themes` and rename to cagece
- Copy viz to `pentaho-solutions/system`


- Add lines in `pentaho-solutions/system/common-ui/themes.xml` on tag themes

```xml
<kianite display-name="Kianite" system="true">
    <file>globalKianite.css</file>
    <file>bootstrap/css/bootstrap-namespaced.css</file>
  </kianite>
```
- Add lines in `tomcat/webapps/pentaho/mantle/themes.xml` on tag themes

```xml
<kianite>
    <file>mantleKianite.css</file>
  </kianite>
```
