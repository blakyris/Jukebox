<?php

namespace App\Controller\API\Library;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Document\Artist;

class ArtistController
{
    /**
     * @Route("/api/library/artists/get/all", methods={"GET"})
     */
    public function getAll(DocumentManager $dm)
    {
        $artists = $dm->getRepository(Artist::class)->findAll();
        
        foreach ($artists as $artist)
            $json[] = $artist->getName();

        return new JsonResponse($json);
    }

    /**
     * @Route("/api/library/artists/get/{name}", methods={"GET"})
     */
    public function getArtist(DocumentManager $dm, String $name)
    {
        $artist = $dm->getRepository(Artist::class)->findBy(['name' => $name]);

        return new JsonResponse($artist);
    }
}
