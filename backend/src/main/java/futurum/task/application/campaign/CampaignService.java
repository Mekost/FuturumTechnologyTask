package futurum.task.application.campaign;

import futurum.task.application.campaign.dto.CampaignRequestDto;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CampaignService {

    private static final BigDecimal INITIAL_BALANCE = new BigDecimal("10000.00");
    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Campaign getCampaign(Long id) {
        return campaignRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Transactional
    public Campaign createCampaign(CampaignRequestDto request) {
        Campaign campaign = Campaign.builder()
                .name(request.name())
                .bidAmount(request.bidAmount())
                .campaignFund(request.campaignFund())
                .keywords(request.keywords())
                .status(request.status())
                .town(request.town())
                .radius(request.radius())
                .build();

        checkFunds(getBalance(), request.campaignFund());
        return campaignRepository.save(campaign);
    }

    @Transactional
    public Campaign editCampaign(CampaignRequestDto request, Long id) {
        Campaign existing = getCampaign(id);
        checkFunds(getBalance().add(existing.getCampaignFund()), request.campaignFund());
        Campaign campaign = Campaign.builder()
                .id(id)
                .name(request.name())
                .bidAmount(request.bidAmount())
                .campaignFund(request.campaignFund())
                .keywords(request.keywords())
                .status(request.status())
                .town(request.town())
                .radius(request.radius())
                .build();

        return campaignRepository.save(campaign);
    }

    @Transactional
    public void deleteCampaign(Long id) {
        campaignRepository.delete(getCampaign(id));
    }

    public BigDecimal getBalance() {
        return INITIAL_BALANCE.subtract(campaignRepository.sumCampaignFunds());
    }

    private void checkFunds(BigDecimal available, BigDecimal required) {
        if (required.compareTo(available) > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient funds");
        }
    }
}
