package futurum.task.application.campaign.keyword;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/keywords")
public class CampaignKeywordController {

    private static final List<String> KEYWORDS = List.of(
            "apple", "pear", "cherry", "dragonfruit", "blueberry", "raspberry", "tomato", "potato", "lettuce",
            "carrot", "onion", "chicken");

    @GetMapping
    public List<String> getKeywords(@RequestParam(defaultValue = "") String q) {
        return KEYWORDS.stream()
                .filter(k -> k.startsWith(q.toLowerCase()))
                .toList();
    }
}
