<?php

namespace App\Controller\API\Library;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Document\Artist;
use App\Document\Album;

class SearchController
{
    /**
     * @Route("/api/library/search/artist/{name}", methods={"GET"})
     */
    public function searchArtist(DocumentManager $dm, $name)
    {
        $artist = $dm->getRepository(Artist::class)->findByName($name);

        return new JsonResponse($artist);
    }

    /**
     * @Route("/api/library/search/album/{name}", methods={"GET"})
     */
    public function searchAlbum(DocumentManager $dm, $name)
    {
        $album = $dm->getRepository(Album::class)->findByName($name);

        return new JsonResponse($album);
    }
}
