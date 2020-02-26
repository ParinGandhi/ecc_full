<?xml version='1.0'?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:fo="http://www.w3.org/1999/XSL/Format" version='1.0'>
				
<xsl:include href="uspto_letter_head_ptab.xsl" />

<!--*********************************************************************************-->
	<xsl:variable name="titlePart">
        <xsl:choose>
            <xsl:when test="//hearingLocationIdentifier = '1'">ALEXANDRIA, VIRGINIA</xsl:when>
	        <xsl:when test="//hearingLocationIdentifier = '2'">SAN JOSE, CALIFORNIA</xsl:when>
            <xsl:when test="//hearingLocationIdentifier = '3'">DENVER, COLORADO</xsl:when>
			<xsl:when test="//hearingLocationIdentifier = '4'">DETROIT, MICHIGAN</xsl:when>
			<xsl:when test="//hearingLocationIdentifier = '5'">DALLAS, TEXAS</xsl:when>
			<xsl:otherwise>ALEXANDRIA, VIRGINIA</xsl:otherwise>                       
        </xsl:choose>
    </xsl:variable>
	
		<xsl:variable name="instructionPart">
        <xsl:choose>
            <xsl:when test="//hearingLocationIdentifier = '1'">Madison East Building, 9th floor</xsl:when>
	        <xsl:when test="//hearingLocationIdentifier = '2'">USPTO Hearing Room 322</xsl:when>
            <xsl:when test="//hearingLocationIdentifier = '3'">USPTO Hearing Room 14-133</xsl:when>
			<xsl:when test="//hearingLocationIdentifier = '4'">USPTO Hearing Room 2139</xsl:when>
			<xsl:when test="//hearingLocationIdentifier = '5'">USPTO Hearing Room 155</xsl:when>
			<xsl:otherwise>Madison East Building, 9th floor</xsl:otherwise>                       
        </xsl:choose>
    </xsl:variable>

<xsl:template name="SPACE_TEMPLATE">
    <xsl:text>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</xsl:text>  
</xsl:template>
<xsl:template name="PTAB_ADDRESS">
    <fo:block  font-family="Times Roman" font-size="14pt" text-align="center">
      PATENT TRIAL and APPEAL BOARD
    </fo:block>
    <fo:block  font-family="Times Roman" font-size="14pt" text-align="center">
      UNITED STATES PATENT AND TRADEMARK OFFICE
    </fo:block>
	<fo:block  font-family="Times Roman" font-size="14pt" text-align="center">
      P.O. BOX 1450
    </fo:block>
	<fo:block  font-family="Times Roman" font-size="14pt" text-align="center">
      ALEXANDRIA, VIRGINIA 22313-1450
    </fo:block>
</xsl:template>

<xsl:template name="ADDRESS_head">

<fo:block font-family="Times Roman" font-size="10pt" text-align="start" >
	<fo:block > 
		<xsl:apply-templates select="//address/nameLineOneText"/> 
	</fo:block>
	<fo:block >
		<xsl:apply-templates select="//address/nameLineTwoText"/> 
	</fo:block>
	<fo:block >
		<xsl:apply-templates select="//address/addressLineOneText"/> 
	</fo:block>
	<fo:block >
		<xsl:apply-templates select="//address/addressLineTwoText"/> 
	</fo:block>
	<fo:block >
		<xsl:apply-templates select="//address/cityName"/>, 
		<xsl:apply-templates select="//address/geographicRegionName"/><xsl:text>  </xsl:text> 
		<xsl:apply-templates select="//address/postalCode"/>
	</fo:block>
	<fo:block >
		<xsl:if test="//address/countryName !='UNITED STATES'">
		<xsl:apply-templates select="//address/countryName"/> 
		</xsl:if>
	</fo:block>
</fo:block>

</xsl:template>

<xsl:template name="FOOTER_head">

<fo:block font-family="Times Roman" font-size="10pt" text-align="start" >
	<fo:block > 
		<xsl:apply-templates select="//fotterAddress/nameLineOneText"/> 
	</fo:block>
	<fo:block >
		<xsl:apply-templates select="//fotterAddress/nameLineTwoText"/> 
	</fo:block>
	<fo:block >
		<xsl:apply-templates select="//fotterAddress/addressLineOneText"/> 
	</fo:block>
	<fo:block >
		<xsl:apply-templates select="//fotterAddress/addressLineTwoText"/> 
	</fo:block>
	<fo:block >
		<xsl:apply-templates select="//fotterAddress/cityName"/>, 
		<xsl:apply-templates select="//fotterAddress/geographicRegionName"/><xsl:text>  </xsl:text> 
		<xsl:apply-templates select="//fotterAddress/postalCode"/>
	</fo:block>
	<fo:block >
		<xsl:if test="//fotterAddress/countryName !='UNITED STATES'">
		<xsl:apply-templates select="//fotterAddress/countryName"/> 
		</xsl:if>
	</fo:block>
</fo:block>

</xsl:template>

<xsl:template name="APPEAL_head">

<fo:table table-layout="fixed" height="45pt" space-before.optimum="8pt">
<fo:table-column column-width="3.5cm" />
<fo:table-column column-width="7cm" />
	<fo:table-body>
	    <fo:table-row font-family="Times Roman" font-size="10pt" line-height="12pt">
	       	<fo:table-cell>
				<fo:block text-align="start">
                    Appeal No:
				</fo:block>
		    </fo:table-cell>
	       	<fo:table-cell>
				<fo:block >
					<xsl:value-of select="//appealNumber" />
				</fo:block>
		    </fo:table-cell>
	    </fo:table-row>
		<fo:table-row font-family="Times Roman" font-size="10pt" line-height="12pt">
	       	<fo:table-cell>
				<fo:block text-align="start">
                    Appellant:
				</fo:block>
		    </fo:table-cell>
	       	<fo:table-cell>
				<fo:block >
					<xsl:value-of select="//appellant" />
				</fo:block>
		    </fo:table-cell>
	    </fo:table-row> 
		<fo:table-row font-family="Times Roman" font-size="10pt" line-height="12pt">
	       	<fo:table-cell>
				<fo:block text-align="start">
                    Application No:
				</fo:block>
		    </fo:table-cell>
	       	<fo:table-cell>
				<fo:block >
					<xsl:value-of select="//applicationNumber" />
				</fo:block>
		    </fo:table-cell>
	    </fo:table-row>
		<fo:table-row font-family="Times Roman" font-size="10pt" line-height="12pt">
	       	<fo:table-cell>
				<fo:block text-align="start">
                    Hearing Room:
				</fo:block>
		    </fo:table-cell>
	       	<fo:table-cell>
				<fo:block >
					<xsl:value-of select="//hearingLocationIdentifier" />
				</fo:block>
		    </fo:table-cell>
	    </fo:table-row>
		
		<fo:table-row font-family="Times Roman" font-size="10pt" line-height="12pt">
	       	<fo:table-cell>
				<fo:block text-align="start">
                    Hearing Docket:
				</fo:block>
		    </fo:table-cell>
	       	<fo:table-cell>
				<fo:block >
					<xsl:value-of select="//hearingDocketNumber" />
				</fo:block>
		    </fo:table-cell>
	    </fo:table-row>
		<fo:table-row font-family="Times Roman" font-size="10pt" line-height="12pt">
	       	<fo:table-cell>
				<fo:block text-align="start">
                    Hearing Date:
				</fo:block>
		    </fo:table-cell>
	       	<fo:table-cell>
				<fo:block >
					<xsl:value-of select="//hearingDate" />
				</fo:block>
		    </fo:table-cell>
	    </fo:table-row>
		<fo:table-row font-family="Times Roman" font-size="10pt" line-height="12pt">
	       	<fo:table-cell>
				<fo:block text-align="start">
                    Hearing Time:
				</fo:block>
		    </fo:table-cell>
	       	<fo:table-cell>
				<fo:block >
					<xsl:value-of select="//hearingTime" />
				</fo:block>
		    </fo:table-cell>
	    </fo:table-row> 
		<fo:table-row font-family="Times Roman" font-size="10pt" line-height="12pt">
	       	<fo:table-cell>
				<fo:block text-align="start">
                    Location:
				</fo:block>
		    </fo:table-cell>
	       	<fo:table-cell>
				<fo:block font-weight="bold">
					Madison Building - East Wing
				</fo:block>
				<fo:block font-weight="bold">
					600 Dulany Street, 9th Floor
				</fo:block>
				<fo:block font-weight="bold">
					Alexandria, Virginia 22313-1450
				</fo:block>
		    </fo:table-cell>
	    </fo:table-row>

	</fo:table-body>
</fo:table>	

</xsl:template>

<xsl:template name="PAGE_header">
  <fo:block-container height="2cm" width="19cm" top="1cm" left="0cm" position="absolute"
                    color="gray" font-family="Times Roman" font-size="9pt">
	<fo:table table-layout="fixed" >
		<fo:table-column column-width="15cm" />
		<fo:table-column column-width="4cm" />
		<fo:table-body>
			<fo:table-row>
				<fo:table-cell>
					<fo:block space-before.optimum="1pt">
				        Appeal Number
				        <xsl:call-template name="SPACE_TEMPLATE" />
				        <xsl:value-of select="//appealNumber" />
		            </fo:block>
				</fo:table-cell>
				<fo:table-cell>
					<fo:block  font-family="Times Roman" font-size="8pt" text-align="end" space-after.optimum="8pt">
					Page <fo:page-number/> 
					</fo:block>
				</fo:table-cell>
			</fo:table-row>	
			<fo:table-row>
				<fo:table-cell>
				   <xsl:if test="//applicationType ='REGULAR'">
					<fo:block space-before.optimum="1pt">
				        Application number
				        
				        <xsl:value-of select="//applicationNumber" />
		            </fo:block>
					</xsl:if>
					<xsl:if test="//applicationType ='REEXAM'">
					<fo:block space-before.optimum="1pt">
				        Reexamination Control number
				        
				        <xsl:value-of select="//applicationNumber" />
		            </fo:block>
					</xsl:if>
				</fo:table-cell>
			</fo:table-row>				
		</fo:table-body>
	</fo:table>
</fo:block-container>

</xsl:template>

<xsl:template match="/">
<fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">

<fo:layout-master-set>
    <fo:simple-page-master master-name="Letter1"
    page-width="8.5in"  page-height="11in"
    margin-top="0.3in"  margin-bottom="0.5in"
    margin-left="1.4cm" margin-right="2.1cm">
    <fo:region-body/>
    <fo:region-before extent="1.0in"/>    
    <fo:region-after  extent="1.0in"/>
    </fo:simple-page-master>
</fo:layout-master-set>

<fo:page-sequence master-reference="Letter1">

<fo:static-content flow-name="xsl-region-before">
            <xsl:call-template name="PAGE_header"/>
</fo:static-content>

<fo:flow flow-name="xsl-region-body">

<fo:block-container height="5cm" width="6cm" top="3cm" left="0cm" position="absolute">
	<xsl:call-template name="uspto_letter_head18" />
</fo:block-container>		


<!-- ******************************************************************************-->
<!-- *********************************** ADDRESS **********************************-->

<fo:block-container height="5cm" width="6cm" top="7cm" left="0cm" position="absolute">
	<xsl:call-template name="ADDRESS_head"/>
</fo:block-container>

<!-- ******************************************************************************-->
<!-- *********************************** EXAMINER *********************************-->

<fo:block-container height="5cm" width="12cm" top="7cm" left="7cm" position="absolute">
	<xsl:call-template name="APPEAL_head"/>
</fo:block-container>


<fo:block-container height="15cm" width="19cm" top="12cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" font-weight="bold" text-align="center">
	<fo:block space-before.optimum="10pt">
        NOTICE OF HEARING - <xsl:value-of select="$titlePart"/>
    </fo:block>
	<fo:block space-before.optimum="2pt">
        RESPONSE REQUIRED WITHIN 21 DAYS
    </fo:block>
</fo:block-container>
 
 <fo:block-container height="15cm" width="19cm" top="13.5cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="start">
	<fo:block text-indent="1cm" line-height="18pt" space-before.optimum="1pt">	    
        Your attention is directed to 37 CFR 41.47. The above identified appeal will be heard by the Patent Trial and Appeal Board on the date indicated. Hearings will commence at the time set, and as soon as the argument in one appeal is concluded, the succeeding appeal will be taken up. The time allowed for argument is 20 minutes unless additional time is requested and approved before the argument commences.
		<xsl:if test="//applicationType ='REGULAR'">
		If the application involved in this appeal has been published, the hearing will be open to the public.			
		</xsl:if>
		<xsl:if test="//applicationType ='REEXAM'">
		As the hearing relates to an appeal of a reexamination, the hearing will be open to the public.			
		</xsl:if>
    </fo:block>	
	<fo:block text-indent="1cm" line-height="18pt" space-before.optimum="1pt">	 
        <fo:inline text-decoration="underline">	
        CONFIRMATION OF ATTENDANCE OR WAIVER OF THE HEARING IS REQUIRED WITHIN <fo:inline font-weight="bold" keep-together.within-line="always">21 DAYS</fo:inline> OF THE MAILING DATE OF THIS NOTICE </fo:inline>. Failure to respond may subject Appellant(s) to waiver of the oral hearing. If Appellant is no longer interested in having an oral hearing, Appellant must still file a waiver of oral hearing with the Board. This allows the panel to promptly act on the appeal without waiting for the oral hearing date.
    </fo:block>	
	<fo:block text-indent="1cm" line-height="18pt" space-before.optimum="1pt">	    
        Confirmation or waiver of the hearing should be indicated by completing the form below and returning it to the Board. This form may be filed with the Board by any one of the following three alternative methods:
    </fo:block>	
 </fo:block-container>	

 <fo:block-container height="15cm" width="19cm" top="21.5cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="start">
 <fo:list-block provisional-distance-between-starts="0.2cm" provisional-label-separation="0.5cm"
   space-after="12pt" start-indent="0.5cm">
  <fo:list-item space-after="2mm">
    <fo:list-item-label end-indent="label-end()">
      <fo:block>1.  </fo:block>
    </fo:list-item-label>
    <fo:list-item-body start-indent="1cm">
      <fo:block>Via the USPTO Electronic Filing System (EFS) at <fo:inline text-decoration="underline"  color="blue" white-space-collapse="false">http://www.uspto.gov/patents/process/file/efs/</fo:inline></fo:block>
    </fo:list-item-body>
  </fo:list-item>
  <fo:list-item space-after="2mm">
    <fo:list-item-label end-indent="label-end()">
      <fo:block>2.  </fo:block>
    </fo:list-item-label>
    <fo:list-item-body start-indent="1cm">
      <fo:block><fo:inline font-weight="bold" font-style="italic">PREFERRED :</fo:inline> Facsimile transmitted to : The USPTO Central fax number (official copy): <fo:inline keep-together.within-line="always" font-weight="bold">(571) 273-8300</fo:inline> and the PTAB Hearing fax number (courtesy copy): <fo:inline font-weight="bold">(571) 273-9797</fo:inline>. </fo:block>
    </fo:list-item-body>
  </fo:list-item>
    <fo:list-item space-after="2mm">
    <fo:list-item-label end-indent="label-end()">
      <fo:block>3.  </fo:block>
    </fo:list-item-label>
    <fo:list-item-body start-indent="0.5cm">      
	  <fo:table table-layout="fixed" height="45pt" space-before.optimum="12pt">
      <fo:table-column column-width="8cm" />  
      <fo:table-column column-width="8cm" /> 	  
	  <fo:table-body>
	    <fo:table-row font-family="Times Roman"  font-size="12pt" line-height="13pt">
		<fo:table-cell>
			<fo:block >
				By mail at the PTAB mailing address: 
			</fo:block>
			</fo:table-cell>
			<fo:table-cell>
			
			<fo:block >
				Patent Trial and Appeal Board
			</fo:block>
			<fo:block >
				United States Patent and Trademark Office
			</fo:block>
			<fo:block >
				P.O. Box 1450
			</fo:block>
			<fo:block >
				Alexandria, Virginia 22313-1450
			</fo:block>
		</fo:table-cell>
	    </fo:table-row>
	</fo:table-body>
    </fo:table>	
    </fo:list-item-body>
  </fo:list-item>
</fo:list-block>
</fo:block-container>	

<!--2nd page-->
<fo:block break-before="page"></fo:block>
 
 
 <fo:block-container height="15cm" width="19cm" top="3cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" font-weight="bold" text-align="justify">
   <fo:block line-height="18pt" space-before.optimum="1pt">	    
     In all communications relating to this appeal, please identify the appeal by its number.
   </fo:block>	
 </fo:block-container>	
 
 <fo:block-container height="15cm" width="19cm" top="4cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="start">
  <fo:block font-weight="bold" line-height="18pt" space-before.optimum="1pt">	    
     PLEASE ELECT ONE OF THE OPTIONS BELOW:
   </fo:block>	
 <fo:list-block provisional-distance-between-starts="0.2cm" provisional-label-separation="0.5cm"
   space-after="12pt" start-indent="0.5cm">
  <fo:list-item space-after="2mm">
    <fo:list-item-label end-indent="label-end()">
      <fo:block>(  )</fo:block>
    </fo:list-item-label>
    <fo:list-item-body start-indent="1cm">
      <fo:block>I ELECT AN IN-PERSON HEARING AND CONFIRM - ATTENDANCE IN <fo:inline keep-together.within-line="always" font-weight="bold"><xsl:value-of select="$titlePart"/> </fo:inline>
	  <fo:inline keep-together.within-line="always" font-style="italic">(EFS-Web selection: Confirmation of Hearing by Appellant)</fo:inline>
	  </fo:block>
    </fo:list-item-body>
  </fo:list-item>
  <fo:list-item space-after="2mm">
    <fo:list-item-label end-indent="label-end()">
      <fo:block>(  )</fo:block>
    </fo:list-item-label>
    <fo:list-item-body start-indent="1cm">
      <fo:block> I ELECT A TELEPHONIC HEARING - ATTENDANCE CONFIRMED <fo:inline keep-together.within-line="always" font-style="italic">(EFS-Web selection: Confirmation of Hearing by Appellant)</fo:inline> 
	  </fo:block>
    </fo:list-item-body>
  </fo:list-item>
    <fo:list-item space-after="2mm">
    <fo:list-item-label end-indent="label-end()">
      <fo:block>(  )</fo:block>
    </fo:list-item-label>
    <fo:list-item-body start-indent="1cm">
      <fo:block>I ELECT A VIDEO HEARING - ATTENDANCE CONFIRMED  <fo:inline  keep-together.within-line="always" font-style="italic">(EFS-Web selection: Confirmation of Hearing by Appellant)</fo:inline> 
	  </fo:block>
    </fo:list-item-body>
  </fo:list-item>
  <fo:list-item space-after="2mm">
    <fo:list-item-label end-indent="label-end()">
      <fo:block>(  )</fo:block>
    </fo:list-item-label>
    <fo:list-item-body start-indent="1cm">
      <fo:block>I ELECT TO WAIVE HEARING ATTENDANCE <fo:inline keep-together.within-line="always" font-style="italic">(EFS-Web selection: Waiver of Hearing by Appellant)</fo:inline> 
	  </fo:block>
    </fo:list-item-body>
  </fo:list-item>
</fo:list-block>
</fo:block-container>	

<fo:block-container height="15cm" width="19cm" top="10cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="start">
   <fo:block line-height="18pt" space-before.optimum="1pt">	    
     To aid the oral hearings staff in scheduling hearing rooms, please indicate the total
number of participating and observing attendees <fo:inline text-decoration="underline">if more than three are expected</fo:inline>: _____
To aid the judges in determining whether any conflicts exist that may require a recusal, please list in the 'Comments' section the names of any additional person(s) who will be participating in the oral hearing.  (Upon arrival at the <fo:inline keep-together.within-line="always" text-decoration="underline" font-weight="bold"><xsl:value-of select="$instructionPart"/></fo:inline>, all persons presenting arguments must sign in at the Usher's desk.)
   </fo:block>	
 </fo:block-container>	
 
 <fo:block-container height="15cm" width="19cm" top="14cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="start">
    <fo:block >
        Comments/Special Requests:
    </fo:block>
	
	<fo:block space-before.optimum="10pt" >
		________________________________________________________________
	</fo:block>

    <fo:block space-before.optimum="10pt">
        ________________________________________________________________
    </fo:block>
	<fo:block space-before.optimum="10pt">
        _________________________________________________                 
		<xsl:call-template name="SPACE_TEMPLATE" />
		_________________
    </fo:block>
	<fo:block >
        Typed or Printed Name of Attorney/Agent/Appellant
		<xsl:call-template name="SPACE_TEMPLATE" />
		<xsl:call-template name="SPACE_TEMPLATE" />				
		Registration No.
    </fo:block>
	<fo:block space-before.optimum="10pt">
        _________________________________________________                 
		<xsl:call-template name="SPACE_TEMPLATE" />
		_________________
    </fo:block>
	<fo:block >
        Signature of Attorney/Agent/Appellant
		<xsl:call-template name="SPACE_TEMPLATE" />
		<xsl:call-template name="SPACE_TEMPLATE" />
		<xsl:call-template name="SPACE_TEMPLATE" />
		<xsl:call-template name="SPACE_TEMPLATE" />
		Date
    </fo:block>
</fo:block-container>

 <fo:block-container height="15cm" width="19cm" top="20cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="start">
    <fo:block >
        The 'Hearings' section of the PTAB webpage <fo:inline text-decoration="underline"  color="blue" white-space-collapse="false">http://www.uspto.gov/patents-application-process/patent-trial-and-appeal-board/hearings </fo:inline>provides additional information about oral hearings. 
    </fo:block> 
	<fo:block line-height="18pt" space-before.optimum="10pt">	    
       Please direct other inquiries to the PTAB Hearings Clerk at 571-272-9797.
    </fo:block>	
</fo:block-container>

 <!--3rd page-->
<xsl:if test="(count(//fotterAddress/*)>0)"> 
<fo:block break-before="page"></fo:block>

 <fo:block-container height="15cm" width="19cm" top="3cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="left">
	<fo:block line-height="18pt" space-before.optimum="1pt">	    
       cc: Third Party Requester 
    </fo:block>		
 </fo:block-container>	
 <fo:block-container height="5cm" width="12cm" top="4cm" left="1.0cm" position="absolute" font-family="Times Roman" font-size="10pt">
	 <xsl:for-each select=".//fotterAddress">
	<fo:block > 
	    <xsl:value-of select="nameLineOneText" />
		
	</fo:block>
	<fo:block >
		<xsl:value-of select="nameLineTwoText"/> 
	</fo:block>
	<fo:block >
		<xsl:value-of select="addressLineOneText"/> 
	</fo:block>
	<fo:block >
		<xsl:value-of select="addressLineTwoText"/> 
	</fo:block>
	<fo:block >
		<xsl:value-of select="cityName"/>, 
		<xsl:value-of select="geographicRegionName"/><xsl:text>  </xsl:text> 
		<xsl:value-of select="postalCode"/>
	</fo:block>
	<fo:block >
		<xsl:if test="countryName !='UNITED STATES'">
		<xsl:value-of select="countryName"/> 
		</xsl:if>
	</fo:block>
		   <fo:block line-height="18pt" space-before.optimum="10pt">	    
      
            </fo:block>	
	 </xsl:for-each>
 </fo:block-container>
 </xsl:if>
</fo:flow>
</fo:page-sequence>
</fo:root>
</xsl:template>

</xsl:stylesheet>
