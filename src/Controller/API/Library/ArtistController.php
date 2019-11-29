<?php

namespace App\Controller\API\Library;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Document\Artist;

class ArtistController extends AbstractController
{
    /**
     * @Route("/api/library/artists", methods={"GET"})
     */
    public function getAll(DocumentManager $dm)
    {
        $artists = $dm->getRepository(Artist::class)->findAll();
        
        $json = array();
        foreach ($artists as $artist)
            $json[] = $artist->getProperties();

        return new JsonResponse($json);
    }

    /**
     * @Route("/api/library/artists/{name}", methods={"GET"})
     */
    public function getArtist(DocumentManager $dm, String $name)
    {
        $artist = $dm->getRepository(Artist::class)->findBy(['name' => $name]);

        return new JsonResponse($artist->getProperties());
    }
}
