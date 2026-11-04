package futurum.task.application.campaign;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    @Query("select coalesce(sum(c.campaignFund), 0) from Campaign c")
    BigDecimal sumCampaignFunds();

}
