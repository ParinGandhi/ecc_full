package gov.uspto.patent.ptab.domain;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Getter;
import lombok.Setter;

/**
 * This class contains widget feed properties
 * 
 * @author 2020 Development Team
 * 
 */
@Getter
@Setter
@JsonSerialize
@JsonInclude(Include.NON_EMPTY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class WidgetFeed implements Serializable {

    private static final long serialVersionUID = 1912167675805688337L;

    private String title;

    private String link;

    private String author;

    private String publishDate;

    private String updatedDate;

    private String category;

    private String content;

    private Date publishedDate;

}
