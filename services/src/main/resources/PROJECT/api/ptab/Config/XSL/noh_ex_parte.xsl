<?xml version='1.0'?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:fo="http://www.w3.org/1999/XSL/Format" version='1.0'>
				
<xsl:include href="uspto_letter_head_ptab.xsl" />

<!--*********************************************************************************-->
	<xsl:variable name="titlePart">
        <xsl:choose>
            <xsl:when test="//hearingLocationIdentifier = '1'">ALEXANDRIA, VIRGINIA</xsl:when>
	        <xsl:when test="//hearingLocationIdentifier = '5'">SAN JOSE, CALIFORNIA</xsl:when>
            <xsl:when test="//hearingLocationIdentifier = '8'">DENVER, COLORADO</xsl:when>
			<xsl:when test="//hearingLocationIdentifier = '6'">DETROIT, MICHIGAN</xsl:when>
			<xsl:when test="//hearingLocationIdentifier = '7'">DALLAS, TEXAS</xsl:when>
			<xsl:otherwise>ALEXANDRIA, VIRGINIA</xsl:otherwise>                       
        </xsl:choose>
    </xsl:variable>
	
	<xsl:variable name="instructionPart">
        <xsl:choose>
            <xsl:when test="//hearingLocationIdentifier = '1'">Madison East Building, 9th floor</xsl:when>
	        <xsl:when test="//hearingLocationIdentifier = '5'">USPTO Hearing Room 322</xsl:when>
            <xsl:when test="//hearingLocationIdentifier = '8'">USPTO Hearing Room 14-133</xsl:when>
			<xsl:when test="//hearingLocationIdentifier = '6'">USPTO Hearing Room 2139</xsl:when>
			<xsl:when test="//hearingLocationIdentifier = '7'">USPTO Hearing Room 155</xsl:when>
			<xsl:otherwise>Madison East Building, 9th floor</xsl:otherwise>                       
        </xsl:choose>
    </xsl:variable>

<xsl:template name="LOCATION_HEADER">
    <xsl:choose>
            <xsl:when test="//hearingLocationIdentifier = '1'">
			    <fo:block font-weight="bold" font-size="12pt">
					Madison Building - East Wing
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					600 Dulany Street, 9th Floor
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					Alexandria, Virginia 22313-1450
				</fo:block>
			</xsl:when>
			<xsl:when test="//hearingLocationIdentifier = '5'">
			    <fo:block font-weight="bold" font-size="12pt">
					USPTO
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					Hearing Room 322
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					26 Fourth Street 
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					San Jose, California 92113
				</fo:block>
			</xsl:when>
			<xsl:when test="//hearingLocationIdentifier = '8'">
			    <fo:block font-weight="bold" font-size="12pt">
					USPTO
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					Hearing Room 14-133
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					1961 Stout Street, 14th Floor
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					Denver, Colorado 80294
				</fo:block>
			</xsl:when>
			<xsl:when test="//hearingLocationIdentifier = '6'">
			    <fo:block font-weight="bold" font-size="12pt">
					USPTO
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					Hearing Room 2139
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					300 River Place Drive, Suite 2900
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					Detroit, Michigan 48207
				</fo:block>
			</xsl:when>
			<xsl:when test="//hearingLocationIdentifier = '7'">
			    <fo:block font-weight="bold">
					USPTO
				</fo:block>
			    <fo:block font-weight="bold" font-size="12pt">
					Hearing Room 155
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					207 South Houston Street
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					Dallas, Texas 75242
				</fo:block>
			</xsl:when>
			<xsl:otherwise>
			    <fo:block font-weight="bold" font-size="12pt"> 
					Madison Building - East Wing
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					600 Dulany Street, 9th Floor
				</fo:block>
				<fo:block font-weight="bold" font-size="12pt">
					Alexandria, Virginia 22313-1450
				</fo:block>
			</xsl:otherwise>
    </xsl:choose>
</xsl:template>

<xsl:template name="SPACE_TEMPLATE">
    <xsl:text>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</xsl:text>  
</xsl:template>

<xsl:template name="TAB_SPACE">
    <fo:inline>
     <xsl:text>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</xsl:text>  
    </fo:inline>  
</xsl:template>

<xsl:template name="TAB_SPACE_Reg_No">
    <fo:inline>
     <xsl:text>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</xsl:text>  
    </fo:inline>  
</xsl:template>

<xsl:template name="TAB_SPACE_Phone_No">
    <fo:inline>
     <xsl:text>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;</xsl:text>  
    </fo:inline>  
</xsl:template>

<xsl:template name="TAB_SPACE_Date">
    <fo:inline>
     <xsl:text>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
	 &#xA0;&#xA0;&#xA0;&#xA0;</xsl:text>  
    </fo:inline>  
</xsl:template>

<xsl:template name="MINI_TAB_SPACE">
    <fo:inline>
     <xsl:text>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</xsl:text>  
    </fo:inline>  
</xsl:template>


<xsl:template name="SPACE_TEMPLATE1">
   	<fo:block>
     <xsl:text>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</xsl:text>  
    </fo:block>		
</xsl:template>

<xsl:template name="SPACE_TEMPLATE1_test">
   	<fo:block>
     <xsl:text>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</xsl:text>  
    </fo:block>		
</xsl:template>

   <xsl:template name="LINE_SPACE">
      <xsl:text>&#xA0;&#xA0;</xsl:text> 
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

<fo:block font-family="Times Roman" font-size="12pt" text-align="start" >
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
<fo:table-column column-width="5cm" />
<fo:table-column column-width="7cm" />
	<fo:table-body>
	    <fo:table-row font-family="Times Roman" font-size="12pt" line-height="12pt">
	       	<fo:table-cell>
				<fo:block text-align="start">
                    Appeal No:
				</fo:block>
		    </fo:table-cell>
	       	<fo:table-cell>
				<fo:block >
					<xsl:value-of select="//formattedAppealNumber" />
				</fo:block>
		    </fo:table-cell>
	    </fo:table-row>
		<fo:table-row font-family="Times Roman" font-size="12pt" line-height="12pt">
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
		<fo:table-row font-family="Times Roman" font-size="12pt" line-height="12pt">
	       	<fo:table-cell>				
				<xsl:if test="//applicationType ='REGULAR'">
					<fo:block space-before.optimum="1pt">
				        Application No:
		            </fo:block>
					</xsl:if>
					<xsl:if test="//applicationType ='REEXAM'">
					<fo:block space-before.optimum="1pt">
				        Reexamination Control No:
		            </fo:block>
				</xsl:if>
		    </fo:table-cell>
	       	<fo:table-cell>
				
				<xsl:if test="//applicationType ='REGULAR'">
					<fo:block space-before.optimum="1pt">
				        <xsl:value-of select="//applicationNumber" />
		            </fo:block>
					</xsl:if>
					<xsl:if test="//applicationType ='REEXAM'">
					<fo:block space-before.optimum="1pt">
				        <xsl:call-template name="MERGED_APPL_NO" />
		            </fo:block>
				</xsl:if>
		    </fo:table-cell>
	    </fo:table-row>
		<fo:table-row font-family="Times Roman" font-size="12pt" line-height="12pt">
	       	<fo:table-cell>
				<fo:block text-align="start">
                    Hearing Room:
				</fo:block>
		    </fo:table-cell>
	       	<fo:table-cell>
				<fo:block >
					<xsl:value-of select="//hearingRoomDescription" />
				</fo:block>
		    </fo:table-cell>
	    </fo:table-row>
		
		<fo:table-row font-family="Times Roman" font-size="12pt" line-height="12pt">
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
		<fo:table-row font-family="Times Roman" font-size="12pt" line-height="12pt">
	       	<fo:table-cell>
				<fo:block text-align="start">
                    Hearing Date:
				</fo:block>
		    </fo:table-cell>
	       	<fo:table-cell>
				<fo:block >
					<xsl:value-of select="//hearingNoticeDate" />
				</fo:block>
		    </fo:table-cell>
	    </fo:table-row>
		<fo:table-row font-family="Times Roman" font-size="12pt" line-height="12pt">
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
		<fo:table-row font-family="Times Roman" font-size="12pt" line-height="12pt">
	       	<fo:table-cell>
				<fo:block text-align="start">
                    Location:
				</fo:block>
		    </fo:table-cell>
	       	<fo:table-cell> 
				<xsl:call-template name="LOCATION_HEADER"/>
		    </fo:table-cell>
	    </fo:table-row>

	</fo:table-body>
</fo:table>	

</xsl:template>

<xsl:template name="PAGE_header">
  <fo:block-container height="2cm" width="19cm" top="0.5cm"  position="absolute" margin-top="0.5cm" margin-left="1cm" margin-right="1cm"
                    color="gray" font-family="Times Roman" font-size="12pt">
	<fo:table table-layout="fixed" >
		<fo:table-column column-width="15cm" />
		<fo:table-column column-width="4cm" />
		<fo:table-body>
			<fo:table-row>
				<fo:table-cell>
					<fo:block margin-left="-1cm">
				        Appeal Number:
				        <xsl:value-of select="//formattedAppealNumber" />
		            </fo:block>
				</fo:table-cell>
				<fo:table-cell>
					<fo:block  font-family="Times Roman" font-size="12pt" space-after.optimum="6pt">
					Page <fo:page-number/> 
					</fo:block>
				</fo:table-cell>
			</fo:table-row>	
			<fo:table-row>
				<fo:table-cell>
				   <xsl:if test="//applicationType ='REGULAR'">
					<fo:block margin-left="-1cm">
				        Application Number:
				        <xsl:value-of select="//applicationNumber" />
		            </fo:block>
					</xsl:if>
					<xsl:if test="//applicationType ='REEXAM'">
					<fo:block margin-left="-1cm">
				        Reexamination Control Number:
				        <xsl:call-template name="MERGED_APPL_NO" />
		            </fo:block>
					</xsl:if>
				</fo:table-cell>
			</fo:table-row>				
		</fo:table-body>
	</fo:table>
</fo:block-container>
</xsl:template>

<xsl:template name="PAGE_header1">
  <fo:block-container height="2cm" width="19cm" top="0.5cm" left="0cm" position="absolute" margin-top="0.5cm" margin-left="1cm" margin-right="1cm"
                    color="gray" font-family="Times Roman" font-size="12pt">
	<fo:table table-layout="fixed" >
		<fo:table-column column-width="15cm" />
		<fo:table-column column-width="4cm" />
		<fo:table-body>
			<fo:table-row>
				<fo:table-cell>
					<fo:block margin-left="-1cm">
				        Appeal Number:
				        <xsl:value-of select="//formattedAppealNumber" />
		            </fo:block>
				</fo:table-cell>
				<fo:table-cell>
					<fo:block  font-family="Times Roman" font-size="12pt" space-after.optimum="6pt" >
					Page 2
					</fo:block>
				</fo:table-cell>
			</fo:table-row>	
			<fo:table-row>
				<fo:table-cell>
				   <xsl:if test="//applicationType ='REGULAR'">
					<fo:block margin-left="-1cm">
				        Application Number:
				        <xsl:value-of select="//applicationNumber" />
		            </fo:block>
					</xsl:if>
					<xsl:if test="//applicationType ='REEXAM'">
					<fo:block margin-left="-1cm">
				        Reexamination Control Number:
				        <xsl:call-template name="MERGED_APPL_NO" />
		            </fo:block>
					</xsl:if>
				</fo:table-cell>
			</fo:table-row>				
		</fo:table-body>
	</fo:table>
</fo:block-container>
</xsl:template>

<xsl:template name="PAGE_header2">
  <fo:block-container height="2cm" width="19cm" top="0.5cm" left="0cm" position="absolute" margin-top="0.5cm" margin-left="1cm" margin-right="1cm"
                    color="gray" font-family="Times Roman" font-size="12pt">
	<fo:table table-layout="fixed" >
		<fo:table-column column-width="15cm" />
		<fo:table-column column-width="4cm" />
		<fo:table-body>
			<fo:table-row>
				<fo:table-cell>
					<fo:block margin-left="-1cm">
				        Appeal Number:
				        <xsl:value-of select="//formattedAppealNumber" />
		            </fo:block>
				</fo:table-cell>
				<fo:table-cell>
					<fo:block  font-family="Times Roman" font-size="12pt"  space-after.optimum="6pt">
					Page 3
					</fo:block>
				</fo:table-cell>
			</fo:table-row>	
			<fo:table-row>
				<fo:table-cell>
				   <xsl:if test="//applicationType ='REGULAR'">
					<fo:block margin-left="-1cm">
				        Application Number:
				        <xsl:value-of select="//applicationNumber" />
		            </fo:block>
					</xsl:if>
					<xsl:if test="//applicationType ='REEXAM'">
					<fo:block margin-left="-1cm">
				        Reexamination Control Number:
				        <xsl:call-template name="MERGED_APPL_NO" />
		            </fo:block>
					</xsl:if>
				</fo:table-cell>
			</fo:table-row>				
		</fo:table-body>
	</fo:table>
</fo:block-container>
</xsl:template>

 <xsl:template name="MERGED_APPL_NO">
   
   <xsl:for-each select=".//mergedApplicationNumber">			
			     <xsl:choose>
			      <xsl:when test="position() != last()">
			       				   
				      <xsl:value-of select = "."/> ;		
			       
                  </xsl:when>
                  <xsl:otherwise>
                                        				   
				     <xsl:value-of select = "."/>		
			       
                  </xsl:otherwise>	
                 </xsl:choose>		   
    </xsl:for-each>
	
</xsl:template>

<xsl:template name="CONFIRMATION_WAIVER_METHODS">
	<fo:block text-indent="1cm" line-height="18pt" space-before.optimum="1pt">	    
        Confirmation or waiver of the hearing should be indicated by completing the form below and returning it to the Board. This form may be filed with the Board by any one of the following three alternative methods:
    </fo:block>
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
<fo:block line-height="18pt" font-weight="bold" space-before.optimum="1pt">	    
     In all communications relating to this appeal, please identify the appeal number.
   </fo:block>	
</xsl:template>

<xsl:template name="HEARING_SELECTION">
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

   <fo:block line-height="18pt" space-before.optimum="1pt">	    
     To aid the oral hearings staff in scheduling hearing rooms, please indicate the total
number of participating and observing attendees <fo:inline text-decoration="underline">if more than three are expected</fo:inline>: _____
To aid the judges in determining whether any conflicts exist that may require a recusal, please list in the 'Comments' section the names of any additional person(s) who will be participating in the oral hearing.  (Upon arrival at the <fo:inline keep-together.within-line="always" text-decoration="underline" font-weight="bold"><xsl:value-of select="$instructionPart"/></fo:inline>, all persons presenting arguments must sign in at the Usher's desk.)
   </fo:block>	
   <fo:block >
        <xsl:call-template name="SPACE_TEMPLATE" />
    </fo:block>
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
	    
</xsl:template>

<xsl:template name="OWNER_CHECK"> 
   <fo:block space-before.optimum="5pt">
	( ) PATENT OWNER
	<xsl:call-template name="SPACE_TEMPLATE" />
	<xsl:call-template name="SPACE_TEMPLATE" />
	( ) THIRD PARTY REQUESTER
	</fo:block >
</xsl:template>

<xsl:template name="SIGNATURE_BLOCK">

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
</xsl:template>

<xsl:template name="HEARING_INFO_ENQUIRY">
    <fo:block >
        <xsl:call-template name="SPACE_TEMPLATE" />
    </fo:block>
     <fo:block >
        The 'Hearings' section of the PTAB webpage <fo:inline text-decoration="underline"  color="blue" white-space-collapse="false">http://www.uspto.gov/patents-application-process/patent-trial-and-appeal-board/hearings </fo:inline>provides additional information about oral hearings. 
    </fo:block> 
	<fo:block line-height="18pt" space-before.optimum="10pt">	    
       Please direct other inquiries to the PTAB Hearings Clerk at 571-272-9797.
    </fo:block>	
</xsl:template>

<xsl:template name="HEARING_SELECTION_CHECK">
  <fo:block font-weight="bold" line-height="18pt" space-before.optimum="1pt">	    
     CHECK ONE:
   </fo:block>	
 <fo:list-block provisional-distance-between-starts="0.2cm" provisional-label-separation="0.5cm"
   space-after="12pt" start-indent="0.5cm">
  <fo:list-item space-after="2mm">
    <fo:list-item-label end-indent="label-end()">
      <fo:block>(  )</fo:block>
    </fo:list-item-label>
    <fo:list-item-body start-indent="1cm">
      <fo:block>
	     I previously filed my oral hearing request pursuant to 37 C.F.R. § 41.73(b).
	  </fo:block>
    </fo:list-item-body>
  </fo:list-item>  
    <fo:list-item space-after="2mm">
    <fo:list-item-label end-indent="label-end()">
      <fo:block>(  )</fo:block>
    </fo:list-item-label>
    <fo:list-item-body start-indent="1cm">
      <fo:block>
	    I am now filing my initial request to participate in the oral hearing pursuant to 37 C.F. R. § 41.73(d). A request for oral hearing and the fee set forth in 37 C.F.R. § 41.20(b)(3) are either attached to this hearing communication or have already been submitted.
	  </fo:block>
    </fo:list-item-body>
  </fo:list-item>
  
</fo:list-block>
</xsl:template>

<xsl:template name="Remote_Viewing_Request">
<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify"> 
        <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Remote Viewing Request</fo:inline>
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify">
        USPTO regional office locations in (1) Detroit, Michigan; (2) Dallas, Texas; (3) Denver, Colorado; and (4) San Jose, California are generally available for any member of the public to view a hearing, subject to room availability and advance coordination with the PTAB.  For example, Appellant’s in-house counsel based in Palo Alto, California may wish to view the hearing from the USPTO regional office in San Jose, California rather than travel to a hearing scheduled at the USPTO headquarters in Alexandria, Virginia. To request remote video attendance, Appellant must inform the PTAB of the USPTO regional office location and the number of people planning to attend the hearing from the remote location. The PTAB will notify Appellant if the request for remote viewing is granted.  Due to the availability of resources, it may not be possible to grant the request in all instances. 
    </fo:block>
</xsl:template>

<xsl:template name="Special_Requests">
<xsl:call-template name="SPACE_TEMPLATE1" />
<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Special Requests</fo:inline>
	</fo:block>	
	<fo:block>
      <xsl:call-template name="SPACE_TEMPLATE1" />
    </fo:block>	
	<fo:block font-size="12pt" text-align = "justify">
        If Appellant has any special requests related to appearing at an in-person hearing, Appellant should inform the PTAB. Special requests may include physical needs that limit mobility, or visual or hearing impairments. Additionally, Appellant may assist the PTAB by indicating ways to accommodate the special requests. The PTAB will make every effort to accommodate the special requests in the manner suggested by Appellant.
    </fo:block>
</xsl:template>

<xsl:template name="Special_Requests_List">
	<fo:block font-size="12pt" text-align = "justify">	 
        <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Special Requests</fo:inline>
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify"> 
        If Appellant has any special requests related to appearing at an in-person oral hearing, please list those requests.  Special requests may include physical needs that limit mobility, or visual or hearing impairments.  For any special request, please indicate any ways that the PTAB may accommodate the special request.
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="11pt">	    
      ____________________________________________________________  
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="11pt">	    
      ____________________________________________________________  
    </fo:block>
</xsl:template>

<xsl:template name="Submission_of_Appellants_Demonstratives">
<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Submission of Appellant’s Demonstratives</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		If Appellant has any Power Point slides or other demonstratives, they must be provided to the PTAB five (5) days before the hearing date by sending them to PTABHearings@uspto.gov.
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
</xsl:template>

<xsl:template name="Submission_of_Appellants_Demonstratives_interParte">
<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Submission of Appellant’s and/or Respondent’s Demonstratives</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		If Appellant and/or Respondent has any Power Point slides or other demonstratives, they must be provided to the PTAB five (5) days before the hearing date by sending them to PTABHearings@uspto.gov.
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
</xsl:template>

<xsl:template name="Submission_of_Appellants_Response">
<xsl:call-template name="SPACE_TEMPLATE1" />
<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Submission of Appellant’s Response to the Notice of Hearing</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		To return a completed APPELLANT RESPONSE TO NOTICE OF HEARING, Appellant may use one of the following three alternative transmittal methods:
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" text-indent="4cm">	
		1.       By the USPTO Electronic Filing System (EFS), available at
	</fo:block>		
	<fo:block font-size="12pt" text-align = "justify" text-indent="4cm">	
        <fo:inline text-decoration="underline" color = "blue" >http://www.uspto.gov/patents/process/file/efs/</fo:inline>
	</fo:block>		
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" text-indent="4cm">	
		2.     By facsimile transmission to: 
	</fo:block>	
	<fo:block text-indent="4.5cm" font-size="12pt" text-align = "justify" >	
		•	The USPTO Central fax number (official copy): <fo:inline  font-weight="bold" >(571) 273-8300; and</fo:inline>
	</fo:block>	
	<fo:block text-indent="4.5cm" font-size="12pt" text-align = "justify" >	
		•	The PTAB Hearing fax number (courtesy copy): <fo:inline  font-weight="bold" >(571) 273-9797.</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" text-indent="4cm">	
		3.       By USPS first class mail to the PTAB mailing address:	
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify" text-indent="5.5cm" >	
		Patent Trial and Appeal Board
	</fo:block>	
	<fo:block font-size="12pt" text-align = "justify" text-indent="5.5cm" >	
		United States Patent and Trademark Office
	</fo:block>		
	<fo:block font-size="12pt" text-align = "justify" text-indent="5.5cm" >	
		P.O. BOX 1450
	</fo:block>	
	<fo:block font-size="12pt" text-align = "justify" text-indent="5.5cm" >	
		Alexandria, Virginia 22313-1450
	</fo:block>		
	<xsl:call-template name="SPACE_TEMPLATE1" />
</xsl:template>

<xsl:template name="CHECK_ONE">	

  <xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >	
		<fo:inline  font-weight="bold" >CHECK ONE:</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >	
		(<xsl:call-template name="MINI_TAB_SPACE" />) I previously filed my oral hearing request pursuant to 37 C.F.R. § 41.73(b).
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >	
	(<xsl:call-template name="MINI_TAB_SPACE" />) I am now filing my initial request to participate in the oral hearing pursuant to 37 C.F.R. § 41.73(d). A request for oral hearing and the fee set forth in 37 C.F.R. § 41.20(b)(3) are either.
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >	
		(<xsl:call-template name="MINI_TAB_SPACE" />) attached to this hearing communication or  
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >	
		(<xsl:call-template name="MINI_TAB_SPACE" />) have already been submitted.
	</fo:block>
</xsl:template>

<xsl:template name="Select_Options">
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify"  text-indent="3cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  ALEXANDRIA, VA - 600 Dulany Street 
	</fo:block>	
	<fo:block font-size="12pt" text-align = "justify"  text-indent="3cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  DALLAS, TX - 207 South Houston Street  
	</fo:block>	
	<fo:block font-size="12pt" text-align = "justify"  text-indent="3cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  SAN JOSE, CA - 26 S. Fourth Street 
	</fo:block>
	<fo:block font-size="12pt" text-align = "justify"  text-indent="3cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  DETROIT, MI - 300 River Place Drive  
	</fo:block>	
	<fo:block font-size="12pt" text-align = "justify" text-indent="3cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  DENVER, CO - 1961 Stout Street 
	</fo:block>
</xsl:template>

<xsl:template name="Conflicts">
	<fo:block font-size="12pt" text-align = "justify" >		 
        <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Conflicts</fo:inline>
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify" >	
        To aid the judges assigned to the appeal in determining whether any conflicts exist that may require a recusal, please list the names of any additional person(s) who will be participating in the oral hearing and their affiliation with Appellant. 
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >		    
      ____________________________________________________________  
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >	   
      ____________________________________________________________  
    </fo:block>
</xsl:template>

<xsl:template name="Contact_information">
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify" >	  
        For any questions regarding Appellant’s response to the NOTICE OF HEARING, Appellant may be reached via the contact information provided below.
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >	 
     _________________________________________________
	 <xsl:call-template name="TAB_SPACE"/>
	 <xsl:call-template name="TAB_SPACE"/>
	
	____________________
    </fo:block>
	<fo:block font-size="12pt" text-align = "justify" >	    
     Typed or Printed Name of Attorney/Agent/Appellant
	<xsl:call-template name="TAB_SPACE_Reg_No" />
	 Registration No.	 
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >	  
     _________________________________________________
	 <xsl:call-template name="TAB_SPACE"/>
	 <xsl:call-template name="TAB_SPACE"/>

	
	____________________
    </fo:block>
	<fo:block font-size="12pt" text-align = "justify" >	 
     E-Mail address
	<xsl:call-template name="TAB_SPACE_Phone_No" />
	 Phone number	 
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >	    
     _________________________________________________
	 <xsl:call-template name="TAB_SPACE"/>
	 <xsl:call-template name="TAB_SPACE"/>
	
	____________________
    </fo:block>
	<fo:block font-size="12pt" text-align = "justify" >	
     Signature of Attorney/Agent/Appellant
<xsl:call-template name="TAB_SPACE_Date" />
	 Date	 
    </fo:block>
</xsl:template>

<xsl:template name="Hearing_Attendance_Confirmation">
<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
	<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Hearing Attendance Confirmation or Waiver</fo:inline>
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">	    
        Appellant is required to confirm attendance at the hearing or waive the hearing within 21 days of the mailing date of this notice. Appellant may confirm or waive attendance by completing the “APPELLANT RESPONSE TO NOTICE OF HEARING” and returning it to the PTAB. 
    </fo:block>
	
</xsl:template>

<xsl:template name="Options_for_Hearing_Attendance">
<xsl:call-template name="LINE_SPACE" />
	<fo:block font-size="12pt" text-align = "justify">		
	<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Options for Hearing Attendance</fo:inline>
	</fo:block>
	<xsl:call-template name="LINE_SPACE" />
	<fo:block font-size="12pt" text-align = "justify">		    
        If Appellant opts to attend the hearing, Appellant may appear in-person, by telephone, or by video.  In Appellant’s response to the NOTICE OF HEARING, Appellant should indicate  the manner in which Appellant will appear for the hearing. 
    </fo:block>
</xsl:template>

<xsl:template name="Telephonic_Hearing_Attendance">
<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">		 
        <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Telephonic Hearing Attendance</fo:inline>
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify">	    
        In lieu of in-person hearing attendance, Appellant may participate in a hearing by telephone.  Appellant will receive an Order detailing the telephonic hearing instructions. 
    </fo:block>	
</xsl:template>

<xsl:template name="Video_Hearing_Attendance">
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">		 
        <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Video Hearing Attendance</fo:inline>
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify">		    
        In lieu of in-person hearing attendance, Appellant may participate in a hearing by video.  Appellant will receive an Order detailing the video hearing instructions. 
    </fo:block>
</xsl:template>

<xsl:template name="CC">
   <fo:block font-size="12pt" >	    
       cc:
    </fo:block>
</xsl:template>

<xsl:template name="FOOTER_ADDRESS">
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

<!-- <fo:static-content flow-name="xsl-region-before">
            <xsl:call-template name="PAGE_header"/>
</fo:static-content> -->

<fo:flow flow-name="xsl-region-body">

<fo:block-container top="1.3cm" left="0cm" position="absolute"  margin-right="1cm" margin-left="-1cm" >
	<xsl:call-template name="uspto_letter_head18" />
</fo:block-container>		


<!-- ******************************************************************************-->
<!-- *********************************** ADDRESS **********************************-->

<fo:block-container height="5cm" width="6cm" top="4.8cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" >
	<xsl:call-template name="ADDRESS_head"/>
</fo:block-container>

<!-- ******************************************************************************-->
<!-- *********************************** EXAMINER *********************************-->

<fo:block-container height="5cm" width="12cm" top="4.8cm" left="7cm" position="absolute" margin-left="1cm" margin-right="1cm">
	<xsl:call-template name="APPEAL_head"/>
</fo:block-container>
<fo:block-container height="15cm" width="19cm" top="11.2cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm"
        font-family="Times Roman" font-size="12pt" font-weight="bold" text-align="center">
	<fo:block space-before.optimum="10pt">
        NOTICE OF HEARING - <xsl:value-of select="$titlePart"/>
    </fo:block>
	<fo:block space-before.optimum="2pt">
        RESPONSE REQUIRED WITHIN 21 DAYS
    </fo:block>
</fo:block-container>
 
 <fo:block-container height="15cm" width="19cm" top="12.8cm"   position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm"
        font-family="Times Roman" font-size="12pt" >
	<fo:block>	
  <xsl:if test="(substring(//applicationNumber,1,2)='95')">
	<fo:block font-size="12pt" text-align = "justify">	    
        The Patent Trial and Appeal Board (PTAB) will hear the above-identified appeal on the date indicated.  The hearing will commence at the time set, and as soon as the argument in one appeal concludes, the succeeding appeal will be taken up. <fo:inline font-weight="bold">The time allowed for argument is 30 minutes for each Appellant or Respondent who has requested a hearing, </fo:inline>unless additional time is requested and approved before the argument commences. <fo:inline font-weight="bold">Because the hearing relates to an appeal of a reexamination, the hearing will be open to the public.</fo:inline> 			
    </fo:block>
		<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify"> 
        <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Hearing Attendance Confirmation or Waiver</fo:inline>
	</fo:block>	
		<xsl:call-template name="SPACE_TEMPLATE1" />
    <fo:block font-size="12pt" text-align = "justify">	    
        Appellant is required to confirm attendance at the hearing or waive the hearing within 21 days of the mailing date of this notice.  Appellant may confirm or waive attendance  by completing the “APPELLANT RESPONSE TO NOTICE OF HEARING” and returning it to the PTAB.
    </fo:block>
		<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">	    
        Pursuant to § 41.73(d), if any other party to the appeal desires to participate in the oral hearing, but did not request an oral hearing pursuant to § 41.73(b), i.e., within two months after the mailing date of the Examiner's Answer, then this other party will be permitted to participate in the hearing by filing a separate request for oral hearing and the fee set forth in  37 C.F.R. § 41.20(b)(3) within 21 DAYS of the mailing date of this Notice, as well as a confirmation of attendance at the oral hearing. 
    </fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block  font-size="11pt">	 
        <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Options for Hearing Attendance</fo:inline>
	</fo:block>	
		<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt">	    
        If Appellant opts to attend the hearing, Appellant may appear in-person, by telephone, or by video.  In Appellant’s  response to the NOTICE OF HEARING, Appellant should indicate  the manner in which Appellant will appear for the hearing.
    </fo:block>
 </xsl:if>
 <xsl:if test="(substring(//applicationNumber,1,2)!='95')">
 
 <!--1st page reexam exparte-->
 <xsl:if test="//applicationType ='REEXAM'">
 
  	<fo:block font-size="12pt" text-align = "justify">   
        The Patent Trial and Appeal Board (PTAB) will hear the above-identified appeal on the date indicated.  The hearing will commence at the time set, and as soon as the argument in one appeal concludes, the succeeding appeal will be taken up. <fo:inline font-weight="bold">The time allowed for argument is 20 minutes, </fo:inline>unless additional time is requested and approved before the argument commences. <fo:inline font-weight="bold">Because the hearing relates to an appeal of a reexamination, the hearing will be open to the public.</fo:inline>
		<!--xsl:if test="//applicationType ='REEXAM'">
		As the hearing relates to an appeal of a reexamination, the hearing will be open to the public.			
		</xsl:if!-->
    </fo:block>	
	<xsl:call-template name="Hearing_Attendance_Confirmation" />	
	<xsl:call-template name="Options_for_Hearing_Attendance" />
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
	<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">In-Person Hearing Attendance</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">	    
        If Appellant selects in-person hearing attendance, Appellant should identify the preferred location.  Specifically, Appellant may appear at a hearing room in the USPTO Alexandria headquarters or request to use a hearing room or a conference room in one of the USPTO regional offices located in 
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" /> 	
 
 <!--1st page regular -->
 
 </xsl:if>
 <xsl:if test="//applicationType ='REGULAR'">
 	<fo:block font-size="12pt" text-align = "justify">    
        The Patent Trial and Appeal Board (PTAB) will hear the above-identified appeal on the date indicated.  The hearing will commence at the time set, and as soon as the argument in one appeal concludes, the succeeding appeal will be taken up.  The time allowed for argument is 20 minutes, unless additional time is requested and approved before the argument commences. If the application involved in this appeal has been published, the hearing will be open to the public.   
    </fo:block >	
	<xsl:call-template name="LINE_SPACE" />
	<fo:block font-size="12pt" text-align = "justify">  
	<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Hearing Attendance Confirmation or Waiver</fo:inline>
	</fo:block>
	<xsl:call-template name="LINE_SPACE" />
	<fo:block font-size="12pt" text-align = "justify">     
        Appellant is required to confirm attendance at the hearing or waive the hearing within 21 days of the mailing date of this notice.  Appellant may confirm or waive attendance by completing the “APPELLANT RESPONSE TO NOTICE OF HEARING” and returning it to the PTAB. 
    </fo:block>	
	<xsl:call-template name="LINE_SPACE" />
	<fo:block font-size="12pt" text-align = "justify">  
	<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Options for Hearing Attendance</fo:inline>
	</fo:block>
	<xsl:call-template name="LINE_SPACE" />
<fo:block font-size="12pt" text-align = "justify">   
        If Appellant opts to attend the hearing, Appellant may appear in-person, by telephone, or by video.  In Appellant’s response to the NOTICE OF HEARING, Appellant should indicate  the manner in which Appellant will appear for the hearing. 
    </fo:block>	
	<xsl:call-template name="LINE_SPACE" />
	<fo:block font-size="12pt" text-align = "justify">  
	<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">In-Person Hearing Attendance</fo:inline>
	</fo:block>	
	<xsl:call-template name="LINE_SPACE" />
	<fo:block font-size="12pt" text-align = "justify">     
        If Appellant selects in-person hearing attendance, Appellant should identify the preferred location. Specifically, Appellant may appear at a hearing room in the USPTO Alexandria headquarters or request to use a hearing room or a conference room in one of the USPTO regional offices located in (1) Detroit, Michigan; (2) Dallas, Texas; (3) Denver, Colorado; and (4) San Jose, California.  The
    </fo:block>	
	</xsl:if>
 </xsl:if>
 </fo:block>
 </fo:block-container>	

 

<!--2nd page-->
<fo:block break-before="page"></fo:block>
 <xsl:call-template name="PAGE_header"/>
 <xsl:if test="(substring(//applicationNumber,1,2)='95')">
 <fo:block-container height="15cm" width="19cm" top="1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start"> 
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify">  
        <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">In-Person Hearing Attendance</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify">  
        If Appellant selects in-person hearing attendance, Appellant should identify the preferred location.  Specifically, Appellant may appear at a hearing room in the USPTO Alexandria headquarters or request to use a hearing room or a conference room in one of the USPTO regional offices located in (1) Detroit, Michigan; (2) Dallas, Texas; (3) Denver, Colorado; and (4) San Jose, California.  The PTAB attempts to grant all hearing location requests, subject to space availability.   Usage of a hearing room or a conference room in one of the regional offices is not guaranteed until confirmed by the PTAB.  In the event the request cannot be granted, then Appellant is responsible for proposing an alternate option, such as selecting a different USPTO location, by telephone, or by video, which is subject to approval by the PTAB.
		<fo:inline text-decoration="underline" font-weight="bold">Appellant’s selection and the PTAB’s approval to utilize a hearing room or a conference room does not guarantee that an Administrative Patent Judge assigned to the appeal will be physically present at that location</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify"> 
        If Appellant is no longer interested in having a hearing, then Appellant must file a waiver of the hearing with the PTAB.  This allows the panel of Administrative Patent Judges assigned to the appeal to act promptly on the appeal without waiting for the hearing date.
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify">   
        If Appellant fails to respond to this NOTICE OF HEARING, the PTAB will issue a decision on the briefs based on the written record.
    </fo:block>
	<xsl:call-template name="Telephonic_Hearing_Attendance"/>
	<xsl:call-template name="Video_Hearing_Attendance"/>
	<xsl:call-template name="Remote_Viewing_Request" />
</fo:block-container>

<!--3rd page-->
<fo:block break-before="page"></fo:block>
<xsl:call-template name="PAGE_header"/>
<fo:block-container height="15cm" width="19cm" top="1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start"> 
		<xsl:call-template name="SPACE_TEMPLATE1" />	
		<xsl:call-template name="Special_Requests" />
		<xsl:call-template name="SPACE_TEMPLATE1" />
		<xsl:call-template name="Submission_of_Appellants_Demonstratives_interParte" />
		<xsl:call-template name="Submission_of_Appellants_Response" />		
	<fo:block font-size="12pt" text-align = "justify">  
        In all communications relating to this appeal, please identify the appeal number along with the underlying reexamination control number. 
    </fo:block>
		<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">  
        <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Questions</fo:inline>
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />		
<fo:block font-size="12pt" text-align = "justify">  
        For further information about hearings, see 37 CFR $ 41.73 and the Hearings section of the PTAB webpage: <fo:inline text-decoration="underline" color="blue">http://www.uspto.gov/patents-application-process/patent-trial-and-appeal-board/hearings</fo:inline>. Also, for questions, please contact the PTAB Hearings Clerk at 571-272-9797.
    </fo:block>	
</fo:block-container>

<!--4th page-->
<fo:block break-before="page"></fo:block>

<fo:block-container top="1.3cm" left="0cm" position="absolute"  margin-right="1cm" margin-left="-1cm" >
	<xsl:call-template name="uspto_letter_head18" />
</fo:block-container>		


<!-- ******************************************************************************-->
<!-- *********************************** ADDRESS **********************************-->

<fo:block-container height="5cm" width="6cm" top="4.8cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" >
	<xsl:call-template name="ADDRESS_head"/>
</fo:block-container>
<!-- ******************************************************************************-->
<!-- *********************************** EXAMINER *********************************-->
<fo:block-container height="5cm" width="12cm" top="4.8cm" left="7cm" position="absolute" margin-left="1cm" margin-right="1cm">
	<xsl:call-template name="APPEAL_head"/>
</fo:block-container>

<fo:block-container height="15cm" width="19cm" top="11.2cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm"
        font-family="Times Roman" font-size="12pt" font-weight="bold" text-align="center">
	<fo:block space-before.optimum="10pt">
        APPELLANT RESPONSE TO NOTICE OF HEARING  - <xsl:value-of select="$titlePart"/>
    </fo:block>
</fo:block-container>

<fo:block-container height="15cm" width="19cm" top="12.1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start">  
	<fo:block font-size="12pt" text-align = "justify">
       Appellant responds to the NOTICE OF HEARING in the above-identified appeal. 
    </fo:block>		
	<xsl:call-template name="CHECK_ONE" />
	<xsl:call-template name="SPACE_TEMPLATE1" />
<fo:block font-size="12pt" text-align = "justify"> 
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Hearing Attendance Options (please select one)</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify"> 
		(<xsl:call-template name="MINI_TAB_SPACE" />)  I elect an IN-PERSON hearing and request to appear at a hearing room in the following USPTO office:
	</fo:block>	
	<xsl:call-template name="Select_Options" />
		<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify"> 
		(<xsl:call-template name="MINI_TAB_SPACE" />)  I elect a TELEPHONIC hearing.
	</fo:block>

</fo:block-container>

<!--5th page-->
<fo:block break-before="page"></fo:block>
<xsl:call-template name="PAGE_header1"/>
<fo:block-container height="15cm" width="19cm" top="1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm" margin-top="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start"> 
		<xsl:call-template name="SPACE_TEMPLATE1" />
		<xsl:call-template name="SPACE_TEMPLATE1" />	
	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify"> 
		(<xsl:call-template name="MINI_TAB_SPACE" />)  I elect a VIDEO hearing and will appear from a non-USPTO location that I secure for myself.
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify"> 
		(<xsl:call-template name="MINI_TAB_SPACE" />)   I WAIVE the hearing.
	</fo:block>
		<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify"> 
		(<xsl:call-template name="MINI_TAB_SPACE" />) I am requesting to RESCHEDULE the hearing. <fo:inline font-weight="bold">A separate paper must be filed.</fo:inline>
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify"> 
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Remote Viewing Request (please select one)</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify"> 
		Appellant requests remote viewing of the hearing at the following designated USPTO office for the following number of persons: _____________________.
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
		<xsl:call-template name="Select_Options" />
		<xsl:call-template name="SPACE_TEMPLATE1" />		
		<xsl:call-template name="Conflicts" />
		<xsl:call-template name="SPACE_TEMPLATE1" />
		<xsl:call-template name="Special_Requests_List" />
		<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify" >	  
        For any questions regarding Appellant’s response to the NOTICE OF HEARING, Appellant may be reached via the contact information provided below.
    </fo:block>
	
</fo:block-container>

<!--5th page-->
<fo:block break-before="page"></fo:block>
<xsl:call-template name="PAGE_header2"/>
<fo:block-container height="15cm" width="19cm" top="1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start"> 
		<xsl:call-template name="SPACE_TEMPLATE1" />
		<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify" >	 
     _________________________________________________
	 <xsl:call-template name="TAB_SPACE"/>
	 <xsl:call-template name="TAB_SPACE"/>
	____________________
    </fo:block>
	<fo:block font-size="12pt" text-align = "justify" >	    
     Typed or Printed Name of Attorney/Agent/Appellant 
	 <xsl:call-template name="TAB_SPACE_Reg_No"/>
	 Registration No.	 
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >	  
     _________________________________________________
	 <xsl:call-template name="TAB_SPACE"/>
	 <xsl:call-template name="TAB_SPACE"/>
	____________________
    </fo:block>
	<fo:block font-size="12pt" text-align = "justify" >	 
     E-Mail address 
	 <xsl:call-template name="TAB_SPACE_Phone_No"/>
	 Phone number	 
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >	    
     _________________________________________________
	 <xsl:call-template name="TAB_SPACE"/>
	 <xsl:call-template name="TAB_SPACE"/>
	____________________
    </fo:block>
	<fo:block font-size="12pt" text-align = "justify" >	
     Signature of Attorney/Agent/Appellant
	 <xsl:call-template name="TAB_SPACE_Date"/>

	 Date	 
    </fo:block>
		<xsl:call-template name="SPACE_TEMPLATE1" />
		<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify"> 
		(<xsl:call-template name="MINI_TAB_SPACE" />) PATENT OWNER
	<xsl:call-template name="TAB_SPACE"/>
	<xsl:call-template name="TAB_SPACE"/>
		(<xsl:call-template name="MINI_TAB_SPACE" />) THIRD PARTY REQUESTER
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<xsl:if test="(count(//fotterAddress/*)>0)"> 
   
      <xsl:call-template name="CC"/>    
<xsl:call-template name="SPACE_TEMPLATE1" />	  
    
      <xsl:call-template name="FOOTER_ADDRESS"/>
     </xsl:if>
	
</fo:block-container>	
	

</xsl:if> 

<xsl:if test="(substring(//applicationNumber,1,2)!='95')">
<!--2nd page rexam exparte-->
 <xsl:if test="//applicationType ='REEXAM'">
	<fo:block-container height="15cm" width="19cm" top="1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start"> 	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		(1) Detroit, Michigan; (2) Dallas, Texas; (3) Denver, Colorado; and (4) San Jose, California.  The PTAB attempts to grant all hearing location requests, subject to space availability. Usage of a hearing room or a conference room in one of the regional offices is not guaranteed until confirmed by the PTAB.  In the event the request cannot be granted, then Appellant is responsible for proposing an alternate option, such as selecting a different USPTO location, by telephone, or by video, which is subject to approval by the PTAB.
		<fo:inline text-decoration="underline" font-weight="bold" >Appellant’s selection and the PTAB’s approval to utilize a hearing room or a conference room does not guarantee that an Administrative Patent Judge assigned to the appeal will be physically present at that location</fo:inline>.
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">	    
        If Appellant is no longer interested in having a hearing, then Appellant must file a waiver of the hearing with the PTAB.  This allows the panel of Administrative Patent Judges assigned to the appeal to act promptly on the appeal without waiting for the hearing date.     
    </fo:block>	
	<fo:block>
      <xsl:call-template name="SPACE_TEMPLATE1" />
    </fo:block>	
	<fo:block font-size="12pt" text-align = "justify">    
        If Appellant fails to respond to this NOTICE OF HEARING, the PTAB will issue a decision on the briefs based on the written record.    
    </fo:block>
		<xsl:call-template name="Telephonic_Hearing_Attendance"/>
		<xsl:call-template name="Video_Hearing_Attendance"/>
		<xsl:call-template name="Remote_Viewing_Request"/>
		<xsl:call-template name="Special_Requests"/>
	<xsl:call-template name="SPACE_TEMPLATE1" />	
   </fo:block-container>
   
 <!--3rd page reexam exparte-->
 <fo:block break-before="page"></fo:block>
 <xsl:call-template name="PAGE_header"/>
<fo:block-container height="15cm" width="19cm" top="1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start">
	<fo:block font-size="12pt" text-align = "justify">
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<xsl:call-template name="SPACE_TEMPLATE1" />
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Submission of Appellant’s Demonstratives</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		If Appellant has any Power Point slides or other demonstratives, they must be provided to the PTAB five (5) days before the hearing date by sending them to PTABHearings@uspto.gov.
	</fo:block>	
		<xsl:call-template name="Submission_of_Appellants_Response" />
	<fo:block font-size="12pt" text-align = "justify">	    
      In all communications relating to this appeal, please identify the appeal number along with the underlying reexamination control number.  
    </fo:block>		
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">	 
        <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Questions</fo:inline>
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify"> 
        For further information about hearings, see 37 CFR § 41.47 and the Hearings section of the PTAB webpage: <fo:inline text-decoration="underline" color="blue">http://www.uspto.gov/patents-application-process/patent-trial-and-appeal-board/hearings</fo:inline>. Also, for questions, please contact the PTAB Hearings Clerk at 571-272-9797.
    </fo:block>	
</fo:block-container>
<!--4th page-->
<fo:block break-before="page"></fo:block>

<fo:block-container top="1.3cm" left="0cm" position="absolute"  margin-right="1cm" margin-left="-1cm" >
	<xsl:call-template name="uspto_letter_head18" />
</fo:block-container>		


<!-- ******************************************************************************-->
<!-- *********************************** ADDRESS **********************************-->

<fo:block-container height="5cm" width="6cm" top="4.8cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" >
	<xsl:call-template name="ADDRESS_head"/>
</fo:block-container>
<!-- ******************************************************************************-->
<!-- *********************************** EXAMINER *********************************-->
<fo:block-container height="5cm" width="12cm" top="4.8cm" left="7cm" position="absolute" margin-left="1cm" margin-right="1cm">
	<xsl:call-template name="APPEAL_head"/>
</fo:block-container>

<fo:block-container height="15cm" width="19cm" top="11.2cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm"
        font-family="Times Roman" font-size="12pt" font-weight="bold" text-align="center">
	<fo:block space-before.optimum="10pt">
        APPELLANT RESPONSE TO NOTICE OF HEARING  - <xsl:value-of select="$titlePart"/>
    </fo:block>
</fo:block-container>
<fo:block-container height="15cm" width="19cm" top="12.1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start"> 
	<fo:block font-size="12pt" text-align = "justify">
		Appellant responds to the NOTICE OF HEARING in the above-identified appeal.
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Hearing Attendance Options (please select one)</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		(<xsl:call-template name="MINI_TAB_SPACE" />)  I elect an IN-PERSON hearing and request to appear at a hearing room in the following USPTO office:
	</fo:block>	
	<xsl:call-template name="Select_Options" />
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		(<xsl:call-template name="MINI_TAB_SPACE" />)  I elect a TELEPHONIC hearing.
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		(<xsl:call-template name="MINI_TAB_SPACE" />)  I elect a VIDEO hearing and will appear from a non-USPTO location that I secure for myself.
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		(<xsl:call-template name="MINI_TAB_SPACE" />)   I WAIVE the hearing.
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify"> 
		(<xsl:call-template name="MINI_TAB_SPACE" />) I am requesting to RESCHEDULE the hearing. <fo:inline font-weight="bold">A separate paper must be filed.</fo:inline>
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Remote Viewing Request (please select one)</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		Appellant requests remote viewing of the hearing at the following designated USPTO office for the following number of persons: _____________________.
	</fo:block>
</fo:block-container>
	
	<!--4th page  reexam exparte-->
<fo:block break-before="page"></fo:block>
<xsl:call-template name="PAGE_header1"/>
<fo:block-container height="15cm" width="19cm" top="1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm" margin-top="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start">
	<xsl:call-template name="SPACE_TEMPLATE1" />
		
		<xsl:call-template name="Select_Options" />
		<xsl:call-template name="SPACE_TEMPLATE1" />		
		<xsl:call-template name="Conflicts" />
		<xsl:call-template name="SPACE_TEMPLATE1" />
		<xsl:call-template name="SPACE_TEMPLATE1" />
		<xsl:call-template name="Special_Requests_List" />
		<xsl:call-template name="Contact_information" />
</fo:block-container>	

<!--5th page reexam exparte-->	
	<xsl:if test="(count(//fotterAddress/*)>0)"> 
    <fo:block break-before="page"></fo:block>
    <xsl:call-template name="PAGE_header2"/>
   <fo:block-container height="15cm" width="19cm" top="1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm" margin-top="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start">
		<xsl:call-template name="SPACE_TEMPLATE1" />
		<xsl:call-template name="SPACE_TEMPLATE1" />
      <xsl:call-template name="CC"/>       
	<xsl:call-template name="SPACE_TEMPLATE1" />	  
      <xsl:call-template name="FOOTER_ADDRESS"/>
         </fo:block-container> 
     </xsl:if>
</xsl:if>

<!--2nd page regular exparte-->

  <xsl:if test="//applicationType ='REGULAR'">
   <fo:block-container height="15cm" width="19cm" top="1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start"> 
		<xsl:call-template name="SPACE_TEMPLATE1" />
		<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">	    
        PTAB attempts to grant all hearing location requests, subject to space availability. Usage of a hearing room or a conference room in one of the regional offices is not guaranteed until confirmed by the PTAB.  In the event the request cannot be granted, then Appellant is responsible for proposing an alternate option, such as selecting a different USPTO location, by telephone, or by video, which is subject to approval by PTAB.  <fo:inline text-decoration="underline" font-weight="bold">Appellant’s selection and the PTAB’s approval to utilize a hearing room or a conference room does not guarantee that an Administrative Patent Judge assigned to the appeal will be physically present at that location</fo:inline>.
    </fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify">
        If Appellant is no longer interested in having a hearing, then Appellant must file a waiver of the hearing with the PTAB.  This allows the panel of Administrative Patent Judges assigned to the appeal to act promptly on the appeal without waiting for the hearing date.     
    </fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify">    
        If Appellant fails to respond to this NOTICE OF HEARING, the PTAB will issue a decision on the briefs based on the written record.    
    </fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Telephonic Hearing Attendance</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify">   
        In lieu of in-person hearing attendance, Appellant may participate in a hearing by telephone. Appellant will receive an Order detailing the telephonic hearing instructions.     
    </fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Video Hearing Attendance</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
        In lieu of in-person hearing attendance, Appellant may participate in a hearing by video.  Appellant will receive an Order detailing the video hearing instructions.            
    </fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Remote Viewing Request </fo:inline>
	</fo:block>	
		<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
        USPTO regional office locations in (1) Detroit, Michigan; (2) Dallas, Texas; (3) Denver, Colorado; and (4) San Jose, California are generally available for any member of the public to view a hearing, subject to room availability and advance coordination with the PTAB.  For example, Appellant’s in-house counsel based in Palo Alto, California may wish to view the hearing from the USPTO regional office in San Jose, California rather than travel to a hearing scheduled at the USPTO headquarters in Alexandria, Virginia.  To request remote video attendance, Appellant must inform the PTAB of the USPTO regional office location and the number of people planning to attend the hearing from the remote location. The PTAB will notify Appellant if the request for remote viewing is granted.  Due to the availability of resources, it may not be possible to grant the request in all instances.       
    </fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Special Requests</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">   
        If Appellant has any special requests related to appearing at an in-person hearing, Appellant should inform the PTAB.  Special requests may include physical needs that limit mobility, or visual or hearing impairments.  Additionally, Appellant may assist the PTAB by indicating ways to accommodate the special requests.  The PTAB will make every effort to accommodate the special requests in the manner suggested by Appellant.
    </fo:block>		
   </fo:block-container>

  <!--3rd page-->
  
	<fo:block break-before="page"></fo:block>
	<xsl:call-template name="PAGE_header"/>
	 <fo:block-container height="15cm" width="19cm" top="1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start">
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<xsl:call-template name="Submission_of_Appellants_Demonstratives" />
	<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Submission of Appellant’s Response to the Notice of Hearing</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">	
		To return a completed APPELLANT RESPONSE TO NOTICE OF HEARING, Appellant may use one of the following three alternative transmittal methods:
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify" text-indent="4cm">	
		1.       By the USPTO Electronic Filing System (EFS), available at
	</fo:block>		
	<fo:block font-size="12pt" text-align = "justify" text-indent="4cm">	
        <fo:inline text-decoration="underline" color = "blue">http://www.uspto.gov/patents/process/file/efs/</fo:inline>
	</fo:block>		
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	
	<fo:block font-size="12pt" text-align = "justify" text-indent="4cm">	
		2.     By facsimile transmission to: 
	</fo:block>	
	<fo:block text-indent="4.5cm" font-size="12pt" text-align = "justify">	
		•	The USPTO Central fax number (official copy): <fo:inline  font-weight="bold" >(571) 273-8300; and </fo:inline>
	</fo:block>	
	<fo:block text-indent="4.5cm" font-size="12pt" text-align = "justify">	
		•	The PTAB Hearing fax number (courtesy copy): <fo:inline  font-weight="bold" >(571) 273-9797. </fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />

	<fo:block font-size="12pt" text-align = "justify" text-indent="4cm">	
		3.       By USPS first class mail to the PTAB mailing address:	
	</fo:block>	
	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block text-indent="5.5cm" font-size="12pt" text-align = "justify">	
		Patent Trial and Appeal Board
	</fo:block>	
	<fo:block text-indent="5.5cm" font-size="12pt" text-align = "justify">	
		United States Patent and Trademark Office
	</fo:block>		
	<fo:block text-indent="5.5cm" font-size="12pt" text-align = "justify">	
		P.O. BOX 1450
	</fo:block>	
	<fo:block text-indent="5.5cm" font-size="12pt" text-align = "justify">	
		Alexandria, Virginia 22313-1450
	</fo:block>		
	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	
	<fo:block font-size="12pt" text-align = "justify">	
		In all communications relating to this appeal, please identify the appeal number along with the underlying application number.  
	</fo:block>	

	<xsl:call-template name="SPACE_TEMPLATE1" />

	<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Questions</fo:inline>
	</fo:block>		
	
	<xsl:call-template name="SPACE_TEMPLATE1" />

	<fo:block font-size="12pt" text-align = "justify">
		For further information about hearings, see 37 CFR $ 41.47 and the Hearings section of the PTAB webpage: <fo:inline text-decoration="underline" color = "blue">http://www.uspto.gov/patents-application-process/patent-trial-and-appeal-board/hearings</fo:inline>. Also, for questions, please contact the PTAB Hearings Clerk at 571-272-9797. 
	</fo:block>	
	
	 </fo:block-container>	

 <!-- 4th page -->
 
	<fo:block break-before="page"></fo:block>
	
<fo:block-container top="1.3cm" left="0cm" position="absolute"  margin-right="1cm" margin-left="-1cm" >
	<xsl:call-template name="uspto_letter_head18" />
</fo:block-container>

<!-- ******************************************************************************-->
<!-- *********************************** ADDRESS **********************************-->

<fo:block-container height="5cm" width="6cm" top="4.8cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" >
	<xsl:call-template name="ADDRESS_head"/>
</fo:block-container>
<!-- ******************************************************************************-->
<!-- *********************************** EXAMINER *********************************-->
<fo:block-container height="5cm" width="12cm" top="4.8cm" left="7cm" position="absolute" margin-left="1cm" margin-right="1cm">
	<xsl:call-template name="APPEAL_head"/>
</fo:block-container>

<fo:block-container height="15cm" width="19cm" top="11cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm"
        font-family="Times Roman" font-size="12pt" font-weight="bold" text-align="center">
	<fo:block space-before.optimum="10pt">
        APPELLANT RESPONSE TO NOTICE OF HEARING  - <xsl:value-of select="$titlePart"/>
    </fo:block>
</fo:block-container>

<fo:block-container height="15cm" width="19cm" top="11.6cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start"> 

	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify">
		Appellant responds to the NOTICE OF HEARING in the above-identified appeal.  
	</fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
		<fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Hearing Attendance Options (please select one)</fo:inline>
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify">
		(<xsl:call-template name="MINI_TAB_SPACE" />)  I elect an IN-PERSON hearing and request to appear at a hearing room in the following USPTO office:  
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify" text-indent="2.5cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  ALEXANDRIA, VA - 600 Dulany Street  
	</fo:block>		
	<fo:block font-size="12pt" text-align = "justify" text-indent="2.5cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  DALLAS, TX - 207 South Houston Street  
	</fo:block>		
	<fo:block font-size="12pt" text-align = "justify" text-indent="2.5cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  SAN JOSE, CA - 26 S. Fourth Street   
	</fo:block>		
	<fo:block font-size="12pt" text-align = "justify" text-indent="2.5cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  DETROIT, MI - 300 River Place Drive  
	</fo:block>		
	<fo:block font-size="12pt" text-align = "justify" text-indent="2.5cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  DENVER, CO - 1961 Stout Street  
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  I elect a TELEPHONIC hearing. 
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  I elect a VIDEO hearing and will appear from a non-USPTO location that I secure for myself.  
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)   I WAIVE the hearing.
	</fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block font-size="12pt" text-align = "justify"> 
		(<xsl:call-template name="MINI_TAB_SPACE" />) I am requesting to RESCHEDULE the hearing. <fo:inline font-weight="bold">A separate paper must be filed.</fo:inline>
	</fo:block>	
	</fo:block-container>
 <!-- 5th page -->	
	<fo:block break-before="page"></fo:block>
	 	<xsl:call-template name="PAGE_header1"/> 
 <fo:block-container height="15cm" width="19cm" top="1cm" left="0cm" position="absolute" margin-left="1cm" margin-right="1cm" margin-bottom="1cm" margin-top="1cm"
        font-family="Times Roman" font-size="12pt" text-align="start">
	<xsl:call-template name="SPACE_TEMPLATE1" />
		<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
       <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Remote Viewing Request (please select one)</fo:inline>
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block>
       Appellant requests remote viewing of the hearing at the following designated USPTO office for the following number of persons: _____________________.
    </fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />

	<fo:block font-size="12pt" text-align = "justify" text-indent="2.5cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  ALEXANDRIA, VA - 600 Dulany Street  
	</fo:block>		
	<fo:block font-size="12pt" text-align = "justify" text-indent="2.5cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  DALLAS, TX - 207 South Houston Street  
	</fo:block>		
	<fo:block font-size="12pt" text-align = "justify" text-indent="2.5cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  SAN JOSE, CA - 26 S. Fourth Street   
	</fo:block>		
	<fo:block font-size="12pt" text-align = "justify" text-indent="2.5cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  DETROIT, MI - 300 River Place Drive  
	</fo:block>		
	<fo:block font-size="12pt" text-align = "justify" text-indent="2.5cm">	
		(<xsl:call-template name="MINI_TAB_SPACE" />)  DENVER, CO - 1961 Stout Street  
	</fo:block>	

	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
       <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Conflicts</fo:inline>
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />		
	<fo:block font-size="12pt" text-align = "justify" >	
		To aid the judges assigned to the appeal in determining whether any conflicts exist that may require a recusal, please list the names of any additional person(s) who will be participating in the oral hearing and their affiliation with Appellant.     
	</fo:block>		
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block>
      ____________________________________________________________
    </fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block>
      ____________________________________________________________
    </fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify">
       <fo:inline text-decoration="underline" font-weight="bold" font-style="italic">Special Requests</fo:inline>
    </fo:block>
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block font-size="12pt" text-align = "justify" >	
		If Appellant has any specials requests related to appearing at an in-person oral hearing, please list those requests.  Special requests may include physical needs that limit mobility, or visual or hearing impairments.  For any special request, please indicate any ways that the PTAB may accommodate the special request.        
	</fo:block>		
	<xsl:call-template name="SPACE_TEMPLATE1" />
	<fo:block>
      ____________________________________________________________
    </fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<fo:block>
      ____________________________________________________________
    </fo:block>	
	<xsl:call-template name="SPACE_TEMPLATE1" />	
	<xsl:call-template name="Contact_information" />
	
			
</fo:block-container> 
	 
	<!-- <fo:block-container height="5cm" width="12cm" top="4cm" left="1.0cm" position="absolute" font-family="Times Roman" font-size="10pt">
	    <xsl:call-template name="FOOTER_ADDRESS"/>
	</fo:block-container>
	</xsl:if>-->
</xsl:if>
</xsl:if>

 
</fo:flow>
</fo:page-sequence>
</fo:root>
</xsl:template>

</xsl:stylesheet>
