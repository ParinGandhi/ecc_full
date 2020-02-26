<?xml version='1.0'?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:fo="http://www.w3.org/1999/XSL/Format" version='1.0'>


<!--***************************** For 18 cm wide PTO correspondance *****************************-->
<!--***************************************** USPTO Seal ****************************************-->

<xsl:template name="uspto_letter_head18">

<fo:table width="18cm" table-layout="fixed">
	<fo:table-column column-width="18cm" />	
	<fo:table-body>
		<fo:table-row>

			<fo:table-cell>
				<fo:block>
					<fo:external-graphic width="9.9cm"
						height="2.2cm"
						src="file:///C:/opt/jboss/bundles/environment/properties/Config/XSL/uspto_ptab_seal.png" />
				</fo:block>
			</fo:table-cell>

		</fo:table-row>
	</fo:table-body>
</fo:table>

</xsl:template>

</xsl:stylesheet>


