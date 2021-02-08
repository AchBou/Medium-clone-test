<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ReactionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
/**
 * @ApiResource(
 *     normalizationContext={"groups"={"reaction:read"}},
 *     denormalizationContext={"groups"={"reaction:write"}}
 *)
 * @ORM\Entity(repositoryClass=ReactionRepository::class)
 */
class Reaction
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"reaction:read","article:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"reaction:read", "reaction:write","article:read"})
     */
    private $type;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"reaction:read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"reaction:read"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Article::class, inversedBy="reaction")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"reaction:read"})
     */
    private $article;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="reactions")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"reaction:read","reaction:write"})
     */
    private $owner;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getArticle(): ?Article
    {
        return $this->article;
    }

    public function setArticle(?Article $article): self
    {
        $this->article = $article;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }
}
