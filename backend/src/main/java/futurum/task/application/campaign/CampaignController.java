package futurum.task.application.campaign;

import futurum.task.application.campaign.dto.CampaignRequestDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/campaigns")
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @GetMapping
    public ResponseEntity<List<Campaign>> getAllCampaigns() {
        return ResponseEntity.ok(campaignService.getAllCampaigns());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Campaign> getCampaign(@PathVariable Long id) {
        return ResponseEntity.ok(campaignService.getCampaign(id));
    }

    @PostMapping
    public ResponseEntity<Campaign> createCampaign(@RequestBody @Valid CampaignRequestDto request) {
        Campaign campaign = campaignService.createCampaign(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(campaign);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Campaign> editCampaign(@RequestBody @Valid CampaignRequestDto request, @PathVariable Long id) {
        return ResponseEntity.ok(campaignService.editCampaign(request, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable Long id) {
        campaignService.deleteCampaign(id);
        return ResponseEntity.noContent().build();
    }
}
