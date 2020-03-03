package gov.uspto.patent.ptab.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gov.uspto.patent.ptab.domain.ApplicationUserQuery;
import gov.uspto.patent.ptab.domain.ApplicationUserView;
import gov.uspto.patent.ptab.domain.ChannelDetails;
import gov.uspto.patent.ptab.service.UserManagementService;
import lombok.extern.slf4j.Slf4j;

/**
 * This class handles REST calls for User Relationship.
 *
 * @author 2020 development team
 *
 */
@Slf4j
@RestController
@RequestMapping(value = "/user-management")
public class UserManagementController {

	@Autowired
	private UserManagementService userManagementService;

	@Value("${max.channel.timeout}")
	private int maxChannelTimeout;

	/**
	 * This method is used to retrieve user info
	 *
	 * @param applicationUserQuery
	 * @return
	 */
	@GetMapping(value = "/user-info")
	public ApplicationUserView getUserInfo(ApplicationUserQuery applicationUserQuery) {
		return userManagementService.getUserInfo(applicationUserQuery);

	}

	@PostMapping(value = "/channel-info")
	public void getChannel(@Valid @RequestBody ChannelDetails channelDetails) {
		log.info("channel name " + channelDetails.getChannelId() + "," + channelDetails.getChannelName());
		try {
			Thread.sleep(maxChannelTimeout);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}
