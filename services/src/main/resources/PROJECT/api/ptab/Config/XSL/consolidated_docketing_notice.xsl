<?xml version='1.0'?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:fo="http://www.w3.org/1999/XSL/Format" version='1.0'>

<!--*********************************************************************************-->

<xsl:variable name="listf" select="//fotterAddress/nameLineOneText"></xsl:variable>
<xsl:variable name="listm" select="//mergedApplicationNumber"></xsl:variable> 

<xsl:template name="FOOTER_NAME_MERGED_APPL">
    <xsl:for-each select="$listf">               
         <xsl:variable name="thispos" select="position()"/>        
	   <xsl:choose>
			<xsl:when test="position() != last()">
			   <fo:block> 
			   <xsl:value-of select="$listf[position()=$thispos]"/>
				(<xsl:value-of select="$listm[position()=$thispos]"/>) ;		
			  </fo:block>             
           </xsl:when>
           <xsl:otherwise>
               <fo:block> 
				<xsl:value-of select="$listf[position()=$thispos]"/>
				(<xsl:value-of select="$listm[position()=$thispos]"/>) ,		
			  </fo:block>
           </xsl:otherwise>	
       </xsl:choose>	
   </xsl:for-each>
</xsl:template>
  
<xsl:template name="SPACE_TEMPLATE">
    <xsl:text>&#xA0;&#xA0;</xsl:text>  
</xsl:template>

<xsl:template name="PTAB_ADDRESS">
    <fo:block  font-family="Times Roman" font-size="14pt" text-align="center" space-before.optimum="10pt">
      
    </fo:block>
    <fo:block  font-family="Times Roman" font-size="14pt" text-align="center" space-before.optimum="10pt">
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
				        Appeal
				        <xsl:call-template name="SPACE_TEMPLATE" />
				        <xsl:value-of select="//formattedAppealNumber" />
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
					<fo:block space-before.optimum="1pt">
				        Merged Control
				        <xsl:call-template name="SPACE_TEMPLATE" />
				        <xsl:value-of select="//applicationNumber" /> and 
						<xsl:call-template name="SPACE_TEMPLATE" />
				        <xsl:value-of select="//applicationNumber" />
		            </fo:block>
				</fo:table-cell>
			</fo:table-row>	
			<fo:table-row>
				<fo:table-cell>
					<fo:block space-before.optimum="1pt">
				        Patent
				        <xsl:call-template name="SPACE_TEMPLATE" />
				        <xsl:value-of select="//patentNumber" />
		            </fo:block>
				</fo:table-cell>
			</fo:table-row>	
		</fo:table-body>
	</fo:table>
</fo:block-container>

</xsl:template>

<xsl:template name="INTERPAGE_header">
  <fo:block-container height="2cm" width="19cm" top="1cm" left="0cm" position="absolute"
                    color="gray" font-family="Times Roman" font-size="9pt">
	<fo:table table-layout="fixed" >
		<fo:table-column column-width="15cm" />
		<fo:table-column column-width="4cm" />
		<fo:table-body>
			<fo:table-row>
				<fo:table-cell>
					<fo:block space-before.optimum="1pt">
				        Appeal
				        <xsl:call-template name="SPACE_TEMPLATE" />
				        <xsl:value-of select="//formattedAppealNumber" />
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
					<fo:block space-before.optimum="1pt">
				        Reexamination Control
				        <xsl:call-template name="SPACE_TEMPLATE" />
				        <xsl:value-of select="//applicationNumber" />
		            </fo:block>
				</fo:table-cell>
			</fo:table-row>	
			<fo:table-row>
				<fo:table-cell>
					<fo:block space-before.optimum="1pt">
				        Patent
				        <xsl:call-template name="SPACE_TEMPLATE" />
				        <xsl:value-of select="//patentNumber" />
		            </fo:block>
				</fo:table-cell>
			</fo:table-row>	
		</fo:table-body>
	</fo:table>
</fo:block-container>

</xsl:template>

<xsl:template name="FOOTER_head">
<xsl:if test="(count(//fotterAddress/*)>0)"> 	
	<xsl:for-each select=".//fotterAddress">
	<fo:block font-family="Times Roman" font-size="10pt" text-align="left" space-before.optimum="10pt"> 
	    <xsl:value-of select="nameLineOneText" />		
	</fo:block>
	<fo:block font-family="Times Roman" font-size="10pt" text-align="left" space-before.optimum="2pt">
		<xsl:value-of select="nameLineTwoText"/> 
	</fo:block>
	<fo:block font-family="Times Roman" font-size="10pt" text-align="left" space-before.optimum="2pt">
		<xsl:value-of select="addressLineOneText"/> 
	</fo:block>
	<fo:block font-family="Times Roman" font-size="10pt" text-align="left" space-before.optimum="2pt">
		<xsl:value-of select="addressLineTwoText"/> 
	</fo:block>
	<fo:block font-family="Times Roman" font-size="10pt" text-align="left" space-before.optimum="2pt">
		<xsl:value-of select="cityName"/>, 
		<xsl:value-of select="geographicRegionName"/><xsl:text>  </xsl:text> 
		<xsl:value-of select="postalCode"/>
	</fo:block>
	<fo:block font-family="Times Roman" font-size="10pt" text-align="left" space-before.optimum="2pt">
		<xsl:if test="countryName !='UNITED STATES'">
		<xsl:value-of select="countryName"/> 
		</xsl:if>
	</fo:block>
		   <fo:block line-height="18pt" space-before.optimum="5pt">	    
      
            </fo:block>	
	 </xsl:for-each>
 
 </xsl:if>
</xsl:template>

<xsl:template name="EXPARTE_head">
   
   <fo:block line-height="0.5cm" font-family="Times Roman" font-size="14pt" text-align="center" >
                Appeal				
                <xsl:value-of select="//formattedAppealNumber" />
   </fo:block>
   <fo:block line-height="0.5cm" font-family="Times Roman" font-size="14pt" text-align="center" >
                Application				
                <xsl:value-of select="//applicationNumber" />
   </fo:block>
   <fo:block line-height="0.5cm" font-family="Times Roman" font-size="14pt" text-align="center" >
                Technology Center
				
                <xsl:value-of select="//gau" />
   </fo:block>
   
</xsl:template>

<xsl:template name="MERGED_head">
   <fo:block line-height="0.5cm" font-family="Times Roman" font-size="14pt" text-align="center" >
                Appeal No.				
                <xsl:value-of select="//formattedAppealNumber" />
   </fo:block>
   <xsl:if test="(count(//patentNumber)>0)">
      <fo:block line-height="0.5cm" font-family="Times Roman" font-size="14pt" text-align="center" >
                Patent No.
				
                <xsl:value-of select="//patentNumber" />
      </fo:block>
   </xsl:if>
   <fo:block line-height="0.5cm" font-family="Times Roman" font-size="14pt" text-align="center" >
                Merged Reexamination Control Nos.
		<xsl:for-each select=".//mergedApplicationNumber">				
		 <xsl:choose>
		  <xsl:when test="(count(//mergedApplicationNumber) = 1) and position() = last()">		   
			  				   
			  <xsl:value-of select = "."/> 							  
		  </xsl:when>
		  <xsl:when test="(count(//mergedApplicationNumber) > 1) and position() = 1">		   
			   			   
			  <xsl:value-of select = "."/>							  
		  </xsl:when>
		  <xsl:when test="(count(//mergedApplicationNumber) > 1) and position() != last()">		   
			   ; 			   
			  <xsl:value-of select = "."/>							  
		  </xsl:when>
		  <xsl:when test="(count(//mergedApplicationNumber) > 1) and position() = last()">	
              and 		  
			  			   
			  <xsl:value-of select = "."/>  							  
		  </xsl:when>
		  <xsl:otherwise>
		   
			 <xsl:call-template name="SPACE_TEMPLATE" />				   
			 <xsl:value-of select = "."/>		
		   
		  </xsl:otherwise>	
		 </xsl:choose>		   
	   </xsl:for-each>
   </fo:block>
   <fo:block line-height="0.5cm" font-family="Times Roman" font-size="14pt" text-align="center" >
                Technology Center
				
                <xsl:value-of select="//gau" />
   </fo:block>
</xsl:template>

<xsl:template name="INTER_head">
   <fo:block line-height="0.5cm" font-family="Times Roman" font-size="14pt" text-align="center" >
                Appeal No.				
                <xsl:value-of select="//formattedAppealNumber" />
   </fo:block>
   <fo:block line-height="0.5cm" font-family="Times Roman" font-size="14pt" text-align="center" >
                Reexamination Control Nos.
		<xsl:for-each select=".//mergedApplicationNumber">				
		 <xsl:choose>
		  <xsl:when test="(count(//mergedApplicationNumber) = 1) and position() = last()">		   
			  				   
			  <xsl:value-of select = "."/> 							  
		  </xsl:when>
		  <xsl:when test="(count(//mergedApplicationNumber) > 1) and position() = 1">		   
			   			   
			  <xsl:value-of select = "."/>							  
		  </xsl:when>
		  <xsl:when test="(count(//mergedApplicationNumber) > 1) and position() != last()">		   
			   ; 			   
			  <xsl:value-of select = "."/>							  
		  </xsl:when>
		  <xsl:when test="(count(//mergedApplicationNumber) > 1) and position() = last()">	
              and 		  
			  			   
			  <xsl:value-of select = "."/>  							  
		  </xsl:when>
		  <xsl:otherwise>
		   
			 <xsl:call-template name="SPACE_TEMPLATE" />				   
			 <xsl:value-of select = "."/>		
		   
		  </xsl:otherwise>	
		 </xsl:choose>		   
	   </xsl:for-each>		
   </fo:block>
   <fo:block line-height="0.5cm" font-family="Times Roman" font-size="14pt" text-align="center" >
                Patent No.
				
                <xsl:value-of select="//patentNumber" />
   </fo:block>
   <fo:block line-height="0.5cm" font-family="Times Roman" font-size="14pt" text-align="center" >
                Technology Center
				
                <xsl:value-of select="//gau" />
   </fo:block>
   
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

<fo:flow flow-name="xsl-region-body">

<!--*****************************************************************************
    THE BODY OF THE LETTER BEGINS HERE.
    *****************************************************************************   -->

<fo:block-container height="15cm" width="19cm" top="1cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="14pt" text-align="center">
    <fo:block >
        UNITED STATES PATENT AND TRADEMARK OFFICE
    </fo:block>
	
	<fo:block space-before.optimum="1pt" >
		_______________
	</fo:block>

    <fo:block space-before.optimum="10pt">
        BEFORE THE PATENT TRIAL AND APPEAL BOARD
    </fo:block>

	<fo:block space-before.optimum="1pt" >
		_______________
	</fo:block>
	<xsl:choose>
	<xsl:when test="(count(//mergedApplicationNumber)>1)">
		<fo:block space-before.optimum="10pt">	
		   <xsl:call-template name="FOOTER_NAME_MERGED_APPL"/>
        </fo:block>		  
		<fo:block space-before.optimum="10pt">		
			v.
		</fo:block>
		<fo:block space-before.optimum="10pt">		
			Patent of
			<xsl:call-template name="SPACE_TEMPLATE" />
			<xsl:value-of select="//appellant" />
		</fo:block>
		<fo:block space-before.optimum="1pt"  space-after.optimum="5pt">
			_______________
		</fo:block>
		<fo:block>
			<xsl:call-template name="MERGED_head"/>
		</fo:block>
	</xsl:when>
	
	<xsl:when test="(substring(//applicationNumber,1,2)='95' and (count(//mergedApplicationNumber)>1))">
	<fo:block space-before.optimum="10pt">		
		<xsl:value-of select="//fotterAddress/nameLineOneText"/> (<xsl:value-of select="//applicationNumber"/>),
	</fo:block>
	<fo:block space-before.optimum="10pt">		
		v.
	</fo:block>
	<fo:block space-before.optimum="10pt">		
		Patent of 
		<xsl:call-template name="SPACE_TEMPLATE" />
		<xsl:value-of select="//appellant" />
	</fo:block>
	<fo:block space-before.optimum="1pt"  space-after.optimum="5pt">
		_______________
	</fo:block>
		<fo:block>
			<xsl:call-template name="MERGED_head"/>
		</fo:block>
	</xsl:when>
	
		<xsl:when test="(substring(//applicationNumber,1,2)='95' and (count(//mergedApplicationNumber)=1))">
	<fo:block space-before.optimum="10pt">		
		<xsl:value-of select="//fotterAddress/nameLineOneText"/> (<xsl:value-of select="//applicationNumber"/>),
	</fo:block>
	<fo:block space-before.optimum="10pt">		
		v.
	</fo:block>
	<fo:block space-before.optimum="10pt">		
		Patent of 
		<xsl:call-template name="SPACE_TEMPLATE" />
		<xsl:value-of select="//appellant" />
	</fo:block>
	<fo:block space-before.optimum="1pt" space-after.optimum="5pt">
		_______________
	</fo:block>
		<fo:block>
			<xsl:call-template name="INTER_head"/>
		</fo:block>
	</xsl:when>
	
	<xsl:otherwise>
   <fo:block space-before.optimum="10pt">
		<fo:inline font-style="italic">Ex parte</fo:inline>
		<xsl:call-template name="SPACE_TEMPLATE" />
		<xsl:value-of select="//appellant" />
	</fo:block>
	
	<fo:block space-before.optimum="1pt" space-after.optimum="5pt">
		_______________
	</fo:block>

	<fo:block>
	<xsl:call-template name="EXPARTE_head"/>
	</fo:block>
	</xsl:otherwise>
	</xsl:choose>
	<fo:block space-before.optimum="1pt" >
			_______________
	</fo:block>
	
	<fo:block>
        <xsl:call-template name="SPACE_TEMPLATE" />
    </fo:block>
	<fo:block space-before.optimum="10pt">
        APPEAL DOCKETING NOTICE
    </fo:block>
</fo:block-container>
 
 <xsl:choose>
  <xsl:when test="(count(//mergedApplicationNumber)>1) or substring(//applicationNumber,1,2)='95'">
 <fo:block-container height="15cm" width="19cm" top="13cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="justify">
	
	<fo:block text-indent="1cm" line-height="18pt" space-before.optimum="10pt">	    
        
		The Patent Trial and Appeal Board received the appeal in the above-identified <fo:inline font-style="italic">inter partes</fo:inline> reexaminations from the Technology Center on <xsl:value-of select="//receivedDate"/>, which has been assigned the appeal number indicated above.
    </fo:block>	
	<fo:block text-indent="1cm" line-height="18pt" space-before.optimum="1pt">	    
		
		The recipient of this notice is reminded of its ongoing duty to update its mandatory notices to identify the real party-in-interest and each judicial or administrative proceeding that could affect, or be affected by, the Board proceeding, e.g., another appeal in a related case, <fo:inline text-decoration="underline">within 20 days of any change during the proceeding</fo:inline>.  37 C.F.R. § 41.8.  
    </fo:block>	
	<fo:block text-indent="1cm" line-height="18pt" space-before.optimum="1pt">	    	   
	   In all future communications regarding this appeal, please include both the reexamination control numbers and the appeal number. Telephone inquiries can be made by calling 571-272-9797 and referencing the appeal number listed above.  The mailing address for the Board is:  
    </fo:block>	
	<xsl:call-template name="PTAB_ADDRESS"/>
 </fo:block-container>	
</xsl:when>
<xsl:otherwise>

<fo:block-container height="15cm" width="19cm" top="10cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="justify">
	<fo:block text-indent="1cm" line-height="18pt" space-before.optimum="10pt">	    
        The Patent Trial and Appeal Board received the appeal in the above-identified application from the Technology Center on <xsl:value-of select="//receivedDate"/>, and has assigned it the appeal number indicated above.
    </fo:block>	
	<fo:block text-indent="1cm" line-height="18pt" space-before.optimum="1pt">	    
        The recipient of this notice is reminded of its ongoing duty, <fo:inline text-decoration="underline">within 20 days of any change during the proceeding</fo:inline>, to update its mandatory notices to identify the real party-in-interest and each judicial or administrative proceeding that could affect, or be affected by, the Board proceeding.  37 C.F.R. § 41.8.  For example, another docketed appeal in a related application may have the potential to affect, or be affected by, the Board proceeding.
    </fo:block>	
	<fo:block text-indent="1cm" line-height="18pt" space-before.optimum="1pt">	    
        In all future communications regarding this appeal, please include both the application number and the appeal number. Telephone inquiries can be made by calling 571-272-9797 and referencing the appeal number listed above. The mailing address for the Board is:
    </fo:block>	
	<xsl:call-template name="PTAB_ADDRESS"/>
 </fo:block-container>	
</xsl:otherwise>
</xsl:choose>

 
<!--2nd page-->
 
  <xsl:choose>
  <xsl:when test="(count(//mergedApplicationNumber)>1)">
  <fo:block break-before="page"></fo:block>
  <xsl:call-template name="PAGE_header"/>
  <fo:block-container height="15cm" width="19cm" top="3cm" left="0cm" position="absolute"
        color="purple" font-family="Times Roman" font-size="12pt" text-align="justify">
   <fo:block text-indent="1cm" line-height="18pt" space-before.optimum="1pt">	    
     If an <fo:inline font-style="italic">ex parte</fo:inline> reexamination has been merged with the <fo:inline font-style="italic">inter partes</fo:inline> reexamination, no responsive submission by any ex parte third party requester is permitted.
   </fo:block>	
 </fo:block-container>	
 
 <fo:block-container height="15cm" width="19cm" top="4.75cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="justify">
   <fo:block text-indent="1cm" line-height="18pt" space-before.optimum="1pt">	    
     All correspondence relating to this <fo:inline font-style="italic">inter partes</fo:inline> reexamination proceeding should be directed to the Central Reexamination Unit at the mail, FAX, or hand-carry addresses given at the end of the communication enclosed with this transmittal.
   </fo:block>	
 </fo:block-container>
<fo:block-container height="15cm" width="19cm" top="7cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="left">
	<fo:block line-height="18pt" space-before.optimum="1pt">	    
       cc: Third Party Requester 
    </fo:block>		
 </fo:block-container>	
 <fo:block-container height="5cm" width="12cm" top="8cm" left="1.0cm" position="absolute">
	<xsl:call-template name="ADDRESS_head"/>
</fo:block-container>

 <fo:block-container height="5cm" width="12cm" top="10cm" left="1.0cm" position="absolute">
	<xsl:call-template name="FOOTER_head"/>
	<fo:block space-before.optimum="5pt">	    
      
    </fo:block>	
</fo:block-container>
 
 </xsl:when>
 <xsl:when test="(substring(//applicationNumber,1,2)='95' and (count(//applicationNumber)>1))">
 <fo:block break-before="page"></fo:block>
 <xsl:call-template name="PAGE_header"/>
  <fo:block-container height="15cm" width="19cm" top="3cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="justify">
   <fo:block text-indent="1cm" line-height="18pt" space-before.optimum="1pt">	    
     All correspondence relating to this <fo:inline font-style="italic">inter partes</fo:inline> reexamination proceeding should be directed to the Central Reexamination Unit at the mail, FAX, or hand-carry addresses given at the end of the communication enclosed with this transmittal.
   </fo:block>	
 </fo:block-container>	
 <fo:block-container height="15cm" width="19cm" top="7cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="left">
	<fo:block line-height="18pt" space-before.optimum="1pt">	    
       cc: Third Party Requester 
    </fo:block>		
 </fo:block-container>	
 <fo:block-container height="5cm" width="12cm" top="8cm" left="1.0cm" position="absolute">
	<xsl:call-template name="ADDRESS_head"/>
</fo:block-container>

 <fo:block-container height="5cm" width="12cm" top="10cm" left="1.0cm" position="absolute">
	<xsl:call-template name="FOOTER_head"/>
	<fo:block space-before.optimum="5pt">	    
      
    </fo:block>	
</fo:block-container>

 </xsl:when>
 
  <xsl:when test="(substring(//applicationNumber,1,2)='95' and (count(//applicationNumber)=1))">
 <fo:block break-before="page"></fo:block>
 <xsl:call-template name="INTERPAGE_header"/>
  <fo:block-container height="15cm" width="19cm" top="3cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="justify">
   <fo:block text-indent="1cm" line-height="18pt" space-before.optimum="1pt">	    
     All correspondence relating to this <fo:inline font-style="italic">inter partes</fo:inline> reexamination proceeding should be directed to the Central Reexamination Unit at the mail, FAX, or hand-carry addresses given at the end of the communication enclosed with this transmittal.
   </fo:block>	
 </fo:block-container>	
 <fo:block-container height="15cm" width="19cm" top="7cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="left">
	<fo:block line-height="18pt" space-before.optimum="1pt">	    
       cc: Third Party Requester 
    </fo:block>		
 </fo:block-container>	
 <fo:block-container height="5cm" width="12cm" top="8cm" left="1.0cm" position="absolute">
	<xsl:call-template name="ADDRESS_head"/>
</fo:block-container>

 <fo:block-container height="5cm" width="12cm" top="10cm" left="1.0cm" position="absolute">
	<xsl:call-template name="FOOTER_head"/>
	<fo:block space-before.optimum="5pt">	    
      
    </fo:block>	
</fo:block-container>

 </xsl:when>
 
 <xsl:otherwise>
 <xsl:if test="(count(//fotterAddress/*)>0)"> 
 <fo:block break-before="page"></fo:block>
 <fo:block-container height="15cm" width="19cm" top="3cm" left="0cm" position="absolute"
        font-family="Times Roman" font-size="12pt" text-align="left">	
	   <fo:block line-height="18pt" space-before.optimum="1pt">	    
       cc: Third Party Requester 
       </fo:block>	
	
	
 </fo:block-container>	
   <fo:block-container height="5cm" width="12cm" top="4cm" left="1.0cm" position="absolute">
	<xsl:call-template name="FOOTER_head"/>
	<fo:block space-before.optimum="5pt">	    
      
    </fo:block>	
</fo:block-container>
</xsl:if>
 </xsl:otherwise>
 </xsl:choose>
 
</fo:flow>
</fo:page-sequence>
</fo:root>
</xsl:template>





</xsl:stylesheet>
