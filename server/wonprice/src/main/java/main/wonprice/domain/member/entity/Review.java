package main.wonprice.domain.member.entity;

import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.product.entity.Product;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Long score;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = true)
    private LocalDateTime deletedAt;

    @Column(nullable = false)
    private Long targetMemberId;

    @ManyToOne
    @JoinColumn(name = "post_member_id")
    private Member postMember;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
