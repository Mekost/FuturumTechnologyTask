package futurum.task.application.campaign.balance;

import futurum.task.application.campaign.CampaignService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/balance")
public class CampaignBalanceController {

    private final CampaignService campaignService;

    public CampaignBalanceController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @GetMapping
    public BigDecimal getBalance() {
        return campaignService.getBalance();
    }
}
