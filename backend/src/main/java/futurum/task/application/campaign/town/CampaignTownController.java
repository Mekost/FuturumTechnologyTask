package futurum.task.application.campaign.town;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/towns")
public class CampaignTownController {

    public record TownOption(String value, String label) {}

    @GetMapping
    public List<TownOption> getTowns() {
        return Arrays.stream(CampaignTown.values())
                .map(town -> new TownOption(town.name(), town.getLabel()))
                .toList();
    }
}