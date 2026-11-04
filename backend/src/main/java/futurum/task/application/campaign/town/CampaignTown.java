package futurum.task.application.campaign.town;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CampaignTown {
    WARSAW("Warsaw"),
    KRAKOW("Kraków"),
    WROCLAW("Wrocław"),
    LONDON("London"),
    BERLIN("Berlin"),
    VIENNA("Vienna"),
    ROME("Rome"),
    MADRID("Madrid");

    private final String label;
}