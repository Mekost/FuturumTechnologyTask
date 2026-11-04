package futurum.task.application.campaign.dto;

import futurum.task.application.campaign.CampaignStatus;
import futurum.task.application.campaign.town.CampaignTown;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

public record CampaignRequestDto(
        @NotBlank String name,
        @NotEmpty List<@NotBlank String> keywords,
        @NotNull @DecimalMin("1.00") BigDecimal bidAmount,
        @NotNull @Positive BigDecimal campaignFund,
        @NotNull CampaignStatus status,
        CampaignTown town,
        @NotNull @Positive Integer radius
) {}