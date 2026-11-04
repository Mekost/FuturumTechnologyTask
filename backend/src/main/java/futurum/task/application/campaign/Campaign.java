package futurum.task.application.campaign;

import futurum.task.application.campaign.town.CampaignTown;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Campaign {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    @ElementCollection
    @NotNull
    private List<String> keywords;

    @NotNull
    private BigDecimal bidAmount;

    @NotNull
    private BigDecimal campaignFund;

    @NotNull
    @Enumerated(EnumType.STRING)
    private CampaignStatus status;

    @Enumerated(EnumType.STRING)
    private CampaignTown town;

    @NotNull
    private Integer radius;

}
